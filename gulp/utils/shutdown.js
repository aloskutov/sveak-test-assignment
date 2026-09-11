// gulp/utils/shutdown.js
import process from 'node:process';

import { bs } from '../config/browser-sync.js';
import { watchers } from './watcher.js';

let isShuttingDown = false;

const shutdown = (signal) => {
  // Защита от повторного вызова (Ctrl+C несколько раз)
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log(`\n📴 Received ${signal}, shutting down gracefully...`);

  // 1. Закрываем watcher'ы
  watchers.forEach((w) => {
    try {
      w.close();
    } catch {
      // ignore
    }
  });
  watchers.length = 0;

  // 2. Останавливаем BrowserSync
  try {
    if (bs.instance) bs.exit();
  } catch {
    // ignore
  }

  // 3. Даём задачам завершиться и выходим
  setTimeout(() => process.exit(0), 100);
};

/**
 *  Явная регистрация shutdown'а
 */
export function registerShutdown() {
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGHUP', () => shutdown('SIGHUP'));
}
