import AdjustLastRow from './modules/adjust-last-row.js';
import Hamburger from './modules/hamburger.js';

new AdjustLastRow('.cards', '.cards__item');
new Hamburger('.hamburger', '#side-menu', {
  openLabel: 'Open menu',
  closeLabel: 'Close menu',
  scrollToTop: true
});
