/**
 * Класс управления боковым меню через кнопку-бургер
 */
class Hamburger {
  #button;
  #menu;
  #openLabel;
  #closeLabel;
  #scrollToTop;
  #handleClick;
  #handleKeydown;
  #mobileQuery;
  #desktopQuery;
  #handleDesktopChange;

  static DEFAULT_MENU_SELECTOR = '#side-menu';
  static DESKTOP_BREAKPOINT = '(min-width: 1024px)';
  static MOBILE_BREAKPOINT = '(max-width: 639px)';

  /**
   * Конструктор класса
   * @param {string} buttonSelector — селектор кнопки
   * @param {string} menuSelector — селектор меню
   * @param {object} options — опции: openLabel, closeLabel, scrollToTop
   */
  constructor(buttonSelector, menuSelector = Hamburger.DEFAULT_MENU_SELECTOR, options = {}) {
    this.#button = document.querySelector(buttonSelector);
    this.#menu = document.querySelector(menuSelector);

    if (!this.#button) throw new Error(`Button not found: ${buttonSelector}`);
    if (!this.#menu) throw new Error(`Menu not found: ${menuSelector}`);

    this.#openLabel = options.openLabel ?? 'Open menu';
    this.#closeLabel = options.closeLabel ?? 'Close menu';
    this.#scrollToTop = options.scrollToTop ?? false;

    this.#init();

    this.#mobileQuery = window.matchMedia(Hamburger.MOBILE_BREAKPOINT);
    this.#desktopQuery = window.matchMedia(Hamburger.DESKTOP_BREAKPOINT);

    this.#handleDesktopChange = (event) => {
      if (event.matches) {
        this.#enableMenu();
      } else if (!this.#isOpen()) {
        this.#disableMenu();
      }
    };

    this.#desktopQuery.addEventListener('change', this.#handleDesktopChange);
    this.#handleDesktopChange(this.#desktopQuery);

    this.#handleClick = () => this.#toggle();
    this.#handleKeydown = (event) => {
      if (event.key === 'Escape' && this.#isOpen()) {
        this.#close();
        this.#button.focus();
        return;
      }

      if (event.key === 'Tab' && this.#isOpen()) {
        this.#trapFocus(event);
      }
    };

    this.#button.addEventListener('click', this.#handleClick);
  }

  /**
   * Установка базовых атрибутов
   */
  #init() {
    if (!this.#button.hasAttribute('aria-expanded')) {
      this.#button.setAttribute('aria-expanded', 'false');
    }

    this.#button.setAttribute('aria-controls', this.#menu.id);
    this.#button.setAttribute('aria-label', this.#openLabel);
  }

  /**
   * Удерживает фокус внутри открытого меню при Tab / Shift+Tab
   * @param {KeyboardEvent} event обрабатываемое событие
   */
  #trapFocus(event) {
    if (!this.#isMobile()) return;

    const focusable = [
      this.#button,
      ...this.#menu.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ),
    ];

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      requestAnimationFrame(() => last.focus());
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      requestAnimationFrame(() => first.focus());
    }
  }

  /**
   * Проверяем открыто ли меню
   * @returns {boolean} true, если открыто
   */
  #isOpen() {
    return this.#button.getAttribute('aria-expanded') === 'true';
  }

  /**
   * Проверяем, мобильная версия или нет
   * @returns {boolean} true, если мобильная версии
   */
  #isMobile() {
    return this.#mobileQuery.matches;
  }

  /**
   * Делает меню доступным для скринридера и Tab
   */
  #enableMenu() {
    this.#menu.removeAttribute('aria-hidden');
    this.#menu.removeAttribute('inert');
  }

  /**
   * Скрывает меню от скринридера и исключает из Tab
   */
  #disableMenu() {
    this.#menu.setAttribute('aria-hidden', 'true');
    this.#menu.setAttribute('inert', '');
  }

  /**
   * Открывает меню
   */
  #open() {
    this.#button.setAttribute('aria-expanded', 'true');
    this.#button.setAttribute('aria-label', this.#closeLabel);
    if (!this.#desktopQuery.matches) {
      this.#enableMenu();
    }
    document.addEventListener('keydown', this.#handleKeydown);
  }

  /**
   * Закрывает меню
   */
  #close() {
    this.#button.setAttribute('aria-expanded', 'false');
    this.#button.setAttribute('aria-label', this.#openLabel);

    if (!this.#desktopQuery.matches) {
      this.#disableMenu();
    }

    document.removeEventListener('keydown', this.#handleKeydown);

    if (this.#scrollToTop) {
      this.#menu.scrollTop = 0;
    }
  }

  /**
   * Переключает состояние меню
   */
  #toggle() {
    this.#isOpen() ? this.#close() : this.#open();
  }

  /**
   * Деструктор класса — отключает обработчики и освобождает ресурсы
   */
  destroy() {
    this.#button.removeEventListener('click', this.#handleClick);
    document.removeEventListener('keydown', this.#handleKeydown);
    this.#desktopQuery.removeEventListener('change', this.#handleDesktopChange);

    if (!this.#desktopQuery.matches) { this.#disableMenu(); }
  }
}

export default Hamburger;
