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

  /**
   * Конструктор класса
   * @param {string} buttonSelector — селектор кнопки
   * @param {string} menuSelector — селектор меню
   * @param {object} options — опции: openLabel, closeLabel, scrollToTop
   */
  constructor(buttonSelector, menuSelector = '#side-menu', options = {}) {
    this.#button = document.querySelector(buttonSelector);
    this.#menu = document.querySelector(menuSelector);

    if (!this.#button) throw new Error(`Button not found: ${buttonSelector}`);
    if (!this.#menu) throw new Error(`Menu not found: ${menuSelector}`);

    this.#openLabel = options.openLabel ?? 'Open menu';
    this.#closeLabel = options.closeLabel ?? 'Close menu';
    this.#scrollToTop = options.scrollToTop ?? false;

    this.#init();

    this.#handleClick = () => this.#toggle();
    this.#handleKeydown = (event) => {
      if (event.key === 'Escape' && this.#isOpen()) {
        this.#close();
        this.#button.focus();
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
   * Проверяем открыто ли меню
   * @returns {boolean} true, если открыто
   */
  #isOpen() {
    return this.#button.getAttribute('aria-expanded') === 'true';
  }

  /**
   * Открывает меню
   */
  #open() {
    this.#button.setAttribute('aria-expanded', 'true');
    this.#button.setAttribute('aria-label', this.#closeLabel);
    this.#menu.setAttribute('aria-hidden', 'false');
    document.addEventListener('keydown', this.#handleKeydown);
  }

  /**
   * Закрывает меню
   */
  #close() {
    this.#button.setAttribute('aria-expanded', 'false');
    this.#button.setAttribute('aria-label', this.#openLabel);
    this.#menu.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', this.#handleKeydown);

    if (this.#scrollToTop) { this.#menu.scrollTop = 0; }
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
  }
}

export default Hamburger;
