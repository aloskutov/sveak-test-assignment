// gulp/utils/shutdown.js
import process from 'node:process';

import { bs } from '../config/browser-sync.js';
import { watchers } from './watcher.js';

let isShuttingDown = false;

const shutdown = (signal) => {
  // Protection against repeated calls (Ctrl+C pressed several times)
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log(`\n📴 Received ${signal}, shutting down gracefully...`);

  // 1. Closing the watchers
  watchers.forEach((w) => {
    try {
      w.close();
    } catch {
      // ignore
    }
  });
  watchers.length = 0;

  // 2. Stopping BrowserSync
  try {
    bs.exit();
  } catch {
    // ignore
  }

  // 3. Let’s finish our tasks and head out
  setTimeout(() => process.exit(0), 500);
};

/**
 *  Explicit registration of ‘shutdown’
 */
export function registerShutdown() {
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGHUP', () => shutdown('SIGHUP'));
}
