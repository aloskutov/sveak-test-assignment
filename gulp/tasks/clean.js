// gulp/tasks/clean.js
import { deleteAsync } from 'del';
import { paths } from '../config/paths.js';

export const clean = async () => {
  const maxRetries = 10;
  const retryDelay = 200;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await deleteAsync(paths.clean, {
        force: true,
        dot: true,
        concurrency: 1,
      });
      console.log('Clean completed');
      return;
    } catch (error) {
      const isLastAttempt = attempt === maxRetries;
      const isPermissionError = error.code === 'EPERM' || error.code === 'EBUSY';

      if (isLastAttempt) {
        console.warn(`Clean skipped: ${error.code} (папка занята другим процессом)`);
        return;
      }

      if (isPermissionError) {
        console.warn(`Clean attempt ${attempt}/${maxRetries} failed (${error.code}), retrying in ${retryDelay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      } else {
        throw error;
      }
    }
  }
};
