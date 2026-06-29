# 🤖 Autonomous Market Sentinel

**Автономный агент-маркетмейкер на базе Unicity Sphere SDK для Testnet v2**

## 📋 Описание

Autonomous Market Sentinel — это полностью автономный экономический агент, работающий на Unicity Testnet v2. Агент выполняет маркетмейкинг без участия человека: сканирует Intent Market, анализирует входящие предложения, автоматически выставляет свои intents и принимает выгодные сделки.

### Ключевые возможности

✅ **Полная автономность (Agentic)** — работает в бесконечном цикле без вмешательства человека  
✅ **Identity & Wallet** — имеет уникальный Unicity Identity и персистентный кошелек  
✅ **Intent Market Integration** — автоматически сканирует и участвует в рынке intents  
✅ **Smart Order Matching** — анализирует входящие PaymentRequests по заданным правилам  
✅ **Auto Market Making** — выставляет собственные intents каждые 30 секунд  
✅ **Messaging Service** — публичный сервис для взаимодействия с другими агентами через DM  
✅ **Broadcast Status** — публикует статус активности в сеть каждые 60 секунд  
✅ **Comprehensive Logging** — полное логирование всех действий в консоль и файл  

## 🎯 Use Case

Агент решает реальную проблему ликвидности в децентрализованных сетях:

- **Для сети**: обеспечивает постоянную ликвидность, автоматически принимая и создавая intents
- **Для других агентов**: предоставляет публичный сервис — любой агент может отправить DM или PaymentRequest
- **Для экосистемы**: демонстрирует возможности полностью автономных экономических агентов

## 🛠️ Технологии

- **Runtime**: Node.js 18+
- **SDK**: @unicitylabs/sphere-sdk
- **Network**: Unicity Testnet v2
- **Primitives**: payments, payment requests, swaps, intent market, messaging, nametags

## 📦 Установка

### Требования

- Node.js версии 18.0.0 или выше
- npm (идет вместе с Node.js)

### Шаги установки

```bash
# Клонируйте репозиторий
git clone https://github.com/YOUR_USERNAME/autonomous-market-sentinel.git
cd autonomous-market-sentinel

# Установите зависимости
npm install

# Запустите агента
node src/index.mjs