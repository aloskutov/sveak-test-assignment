class Hamburger {
  /** @private */
  _button;
  /** @private */
  _menu;
  /** @private */
  _openLabel;
  /** @private */
  _closeLabel;
  /** @private */
  _handleClick;

  /**
   * Конструктор класса
   * @param {string} buttonSelector селектор кнопки
   * @param {string} menuSelector селектор меню
   * @param {object} options объект опций openLabel, closeLabel, scrollToTop
   */
  constructor(buttonSelector, menuSelector = '#top-menu', options = {}) {
    this._button = document.querySelector(buttonSelector);
    this._menu = document.querySelector(menuSelector);

    if (!this._button) throw new Error(`Button not found: ${buttonSelector}`);
    if (!this._menu) throw new Error(`Menu not found: ${menuSelector}`);

    this._openLabel = options.openLabel ?? 'Open menu';
    this._closeLabel = options.closeLabel ?? 'Close menu';
    this._scrollToTop = options.scrollToTop ?? false;

    this._init();

    this._handleClick = () => this._handleMenuToggle();
    this._button.addEventListener('click', () => this._handleMenuToggle());
  }

  /**
   * Установка базовых значений
   */
  _init() {
    if (!this._button.hasAttribute('aria-expanded')) {
      this._button.setAttribute('aria-expanded', 'false');
    }

    this._button.setAttribute('aria-controls', this._menu.id);
    this._button.setAttribute('aria-label', this._openLabel);
  }

  /**
   * Обработчик события клика по кнопке
   */
  _handleMenuToggle() {
    const isExpanded = this._button.getAttribute('aria-expanded') === 'true';

    this._button.setAttribute('aria-expanded', String(!isExpanded));
    this._button.setAttribute('aria-label', isExpanded ? this._openLabel : this._closeLabel);
    this._menu.setAttribute('aria-hidden', String(isExpanded));

    // При закрытии меню, прокручиваем его в начало
    if (isExpanded && this._scrollToTop) { this._menu.scrollTop = 0; }
  }

  /**
   * Деструктор класса
   */
  destroy() {
    this._button.removeEventListener('click', () => this._handleMenuToggle());
  }
}

export default Hamburger;
