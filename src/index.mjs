import { Sphere, TokenRegistry } from '@unicitylabs/sphere-sdk';
import { createNodeProviders } from '@unicitylabs/sphere-sdk/impl/nodejs';
import { createWalletApiProviders } from '@unicitylabs/sphere-sdk/impl/shared/wallet-api';
import { CONFIG } from './config.mjs';
import { logger } from './logger.mjs';

async function main() {
  logger.info(`Запуск Autonomous Market Sentinel на ${CONFIG.NETWORK}...`);

  const base = createNodeProviders({
    network: CONFIG.NETWORK,
    dataDir: './wallet-data',
    tokensDir: './tokens-data',
    oracle: { apiKey: CONFIG.ORACLE_API_KEY },
  });

  const providers = createWalletApiProviders(base, {
    baseUrl: CONFIG.WALLET_API_URL,
    network: CONFIG.NETWORK,
    deviceId: CONFIG.DEVICE_ID,
  });

  const { sphere } = await Sphere.init({
    ...providers,
    network: CONFIG.NETWORK,
    autoGenerate: true,
    accounting: true,
    swap: true,
  });

  logger.success(`Кошелек загружен. Identity: ${sphere.identity?.directAddress}`);

  const registry = TokenRegistry.getInstance();
  const COIN_ID_UCT = registry.getCoinIdBySymbol('UCT');
  const COIN_ID_USDU = registry.getCoinIdBySymbol('USDU') || registry.getCoinIdBySymbol('USDC');

  process.on('SIGINT', async () => {
    logger.warn('Получен сигнал остановки. Завершаем работу...');
    await sphere.destroy();
    process.exit(0);
  });

  // === ПУБЛИЧНЫЙ СЕРВИС: Обработка входящих DM от других агентов ===
  sphere.communications.onDirectMessage(async (msg) => {
    logger.chat(`Входящее DM от ${msg.senderNametag || msg.senderIdentity}: "${msg.text}"`);
    
    // Автоматический ответ (Auto-responder)
    try {
      const autoReply = `🤖 Market Sentinel Online. Current cycle active. Send intent via PaymentRequest for auto-execution.`;
      await sphere.communications.sendDM(msg.senderIdentity, autoReply);
      logger.chat(`Отправлен автоответ для ${msg.senderNametag}`);
    } catch (err) {
      logger.error(`Ошибка отправки DM: ${err.message}`);
    }
  });

  // === ЛОГИКА МАРКЕТМЕЙКЕРА: Прием входящих intents ===
  sphere.payments.onPaymentRequest(async (pr) => {
    logger.market(`Получен входящий Intent от ${pr.senderNametag || 'Unknown'}`);
    try {
      if (pr.canAccept) {
        logger.success(`Intent выгодный! Автоматически принимаем...`);
        await sphere.payments.acceptPaymentRequest(pr);
        logger.success(`Сделка завершена успешно!`);
      } else {
        logger.warn(`Intent отклонен (не проходит по правилам фильтра).`);
      }
    } catch (err) {
      logger.error(`Ошибка обработки Intent: ${err.message}`);
    }
  });

  let cycle = 0;
  let lastBroadcast = 0;
  let lastIntentCreation = 0;
  
  logger.info('Агент запущен в полностью автономном режиме (Agentic).');
  
  while (true) {
    cycle++;
    const now = Date.now();
    
    try {
      await sphere.payments.resumeOpenIntents();

      if (now - lastIntentCreation > CONFIG.INTENT_INTERVAL_MS) {
        const paymentRequest = {
          requestedCoinId: COIN_ID_USDU,
          requestedAmount: 100000000n, 
          offeredCoinId: COIN_ID_UCT,
          offeredAmount: 10000000000000000000n, 
          memo: 'Market Sentinel: Auto MM intent',
        };
        await sphere.payments.sendPaymentRequest(paymentRequest);
        logger.market('Собственный Intent выставлен на рынок.');
        lastIntentCreation = now;
      }

      if (now - lastBroadcast > CONFIG.BROADCAST_INTERVAL_MS) {
        const status = `🤖 Market Sentinel Active | Cycle #${cycle} | Ready for intents | Identity: ${sphere.identity?.directAddress}`;
        await sphere.communications.broadcast(status);
        logger.info('Статус опубликован в сеть.');
        lastBroadcast = now;
      }

    } catch (err) {
      logger.error(`Ошибка в цикле #${cycle}: ${err.message}`);
    }

    await new Promise(resolve => setTimeout(resolve, CONFIG.SCAN_INTERVAL_MS));
  }
}

main().catch((err) => {
  console.error('Критическая ошибка:', err);
  process.exit(1);
});