/**
 * Класс скрывающий последнюю строку грида, если она не заполнена
 */
class AdjustLastRow {
  #grid;
  #items;
  #resizeObserver;

  /**
   * Конструктор класса
   * @param {string} gridSelector - Селектор грида
   * @param {string} itemSelector - Селектор элементов грида
   */
  constructor(gridSelector, itemSelector) {
    this.#grid = document.querySelector(gridSelector);

    if (!this.#grid) throw new Error(`Grid not found: ${gridSelector}`);

    this.#items = this.#grid.querySelectorAll(itemSelector);
    this.#resizeObserver = null;

    requestAnimationFrame(() => this.#run());

    this.#resizeObserver = new ResizeObserver(() => { requestAnimationFrame(() => this.#run()); });
    this.#resizeObserver.observe(this.#grid);
  }

  /**
   * Основной метод класса
   */
  #run() {
    this.#resetStyle();
    this.#hideRemainingItems();
  }

  /**
   * Получает количество колонок грида
   * @returns {number} Количество колонок. 0 если грид скрыт или не отрисован
   */
  #getColumns() {
    const computedColumns = getComputedStyle(this.#grid).gridTemplateColumns;
    return !computedColumns || computedColumns === 'none'
      ? 0
      : computedColumns.split(' ').length;
  }

  /**
   * Сбрасывает стили у скрытых элементов грида
   */
  #resetStyle() {
    this.#items.forEach((item) => { item.style.display = ''; });
  }

  /**
   * Скрывает элементы последней строки, если она неполная
   */
  #hideRemainingItems() {
    const columns = this.#getColumns();

    if (columns > 0) {
      const totalItems = this.#items.length;
      const remainingItems = totalItems % columns;

      if (remainingItems > 0) {
        const startIndex = totalItems - remainingItems;
        for (let i = startIndex; i < totalItems; i++) { this.#items[i].style.display = 'none'; }
      }
    }
  }

  /**
   * Деструктор класса — отключает наблюдатель и освобождает ресурсы
   */
  destroy() {
    if (!this.#resizeObserver) return;

    this.#resizeObserver.disconnect();
    this.#resizeObserver = null;
    this.#resetStyle();
  }
}

export default AdjustLastRow;
