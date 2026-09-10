// gulp/utils/server.js
import { bs } from '../config/browser-sync.js';
import { options } from '../config/options.js';

export const server = (cb) => {
  bs.init(options.browserSync, (err) => {
    if (err) {
      console.error('BrowserSync initialization error:', err);
      cb(err);
      return;
    }
    console.log('✅ BrowserSync initialized');
    cb();
  });
};
