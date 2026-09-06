import {deleteSync} from 'del';
import {paths} from '../config/paths.js';

export const clean = (cb) => {
  deleteSync(paths.clean);
  cb();
};
