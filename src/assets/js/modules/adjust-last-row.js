/**
 * Класс скрывающий последнюю строку грида, если она не заполнена
 */
class AdjustLastRow {
  /** @private */
  _grid;

  /** @private */
  _items;

  /** @private */
  _resizeObserver;

  /**
   * Конструктор класса
   * @param {string} gridSelector - Селектор грида
   * @param {string} itemSelector - Селектор элементов грида
   */
  constructor(gridSelector, itemSelector) {
    this._grid = document.querySelector(gridSelector);
    this._items = this._grid ? this._grid.querySelectorAll(itemSelector) : [];
    this._resizeObserver = null;

    this.run();

    this._resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => this.run());
    });
    this._resizeObserver.observe(this._grid);
  }

  /**
   * Основной метод класса
   * @public
   */
  run() {
    this.resetStyle();
    this.hideRemainingItems();
  }

  /**
   * Получает количество колонок грида
   * @public
   * @returns {number|null} Количество колонок или null, если грид скрыт или не отрисован
   */
  getColumns() {
    const computedColumns = getComputedStyle(this._grid).gridTemplateColumns;
    return !computedColumns || computedColumns === null
      ? false
      : computedColumns.split(' ').length;
  }

  /**
   * Сбрасывает стили у скрытых элементов грида
   * @private
   */
  resetStyle() {
    this._items.forEach((item) => {
      item.style.display = '';
    });
  }

  /**
   * Скрывает элементы последней строки, если она неполная
   * @private
   */
  hideRemainingItems() {
    const columns = this.getColumns();

    if (columns) {
      const totalItems = this._items.length;
      const remainingItems = totalItems % columns;

      if (remainingItems > 0) {
        const startIndex = totalItems - remainingItems;
        for (let i = startIndex; i < totalItems; i++) {
          this._items[i].style.display = 'none';
        }
      }
    }
  }

  /**
   * Деструктор класса — отключает наблюдатель и освобождает ресурсы
   * @public
   */
  destroy() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
  }
}

export default AdjustLastRow;
