import fs from 'fs';
import path from 'path';

const LOG_FILE = path.join(process.cwd(), 'agent.log');

export const logger = {
  info: (msg) => {
    const line = `[${new Date().toISOString()}] ℹ️ ${msg}`;
    console.log(line);
    fs.appendFileSync(LOG_FILE, line + '\n');
  },
  success: (msg) => {
    const line = `[${new Date().toISOString()}] ✅ ${msg}`;
    console.log(line);
    fs.appendFileSync(LOG_FILE, line + '\n');
  },
  warn: (msg) => {
    const line = `[${new Date().toISOString()}] ⚠️ ${msg}`;
    console.log(line);
    fs.appendFileSync(LOG_FILE, line + '\n');
  },
  error: (msg) => {
    const line = `[${new Date().toISOString()}] ❌ ${msg}`;
    console.error(line);
    fs.appendFileSync(LOG_FILE, line + '\n');
  },
  market: (msg) => {
    const line = `[${new Date().toISOString()}] 📊 ${msg}`;
    console.log(line);
    fs.appendFileSync(LOG_FILE, line + '\n');
  },
  chat: (msg) => {
    const line = `[${new Date().toISOString()}] 💬 ${msg}`;
    console.log(line);
    fs.appendFileSync(LOG_FILE, line + '\n');
  }
};