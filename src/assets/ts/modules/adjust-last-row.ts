/**
 * Класс скрывающий последнюю строку грида, если она не заполнена
 */
class AdjustLastRow {
  private _grid: HTMLElement  | null;
  private _items: NodeListOf<Element> | [];
  private _resizeObserver: ResizeObserver | null;

  /**
   * Конструктор класса
   * @param gridSelector - Селектор грида
   * @param itemSelector - Селектор элементов грида
   */
  constructor(gridSelector: string, itemSelector: string) {
    this._grid = document.querySelector<HTMLElement>(gridSelector);
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
   */
  public run(): void {
    this.resetStyle();
    this.hideRemainingItems();
  }

  /**
   * Получает количество колонок грида
   * @returns Количество колонок или `null`, если грид скрыт или не отрисован
   */
  public getColumns(): number | null {
    const computedColumns = getComputedStyle(this._grid!).gridTemplateColumns;
    return !computedColumns || computedColumns === 'none'
      ? null
      : computedColumns.split(' ').length;
  }

  /**
   * Сбрасывает стили у скрытых элементов грида
   */
  private resetStyle(): void {
    this._items.forEach((item) => {
      (item as HTMLElement).style.display = '';
    });
  }

  /**
   * Скрывает элементы последней строки, если она неполная
   */
  private hideRemainingItems(): void {
    const columns = this.getColumns();

    if (columns !== null) {
      const totalItems = this._items.length;
      const remainingItems = totalItems % columns;

      if (remainingItems > 0) {
        const startIndex = totalItems - remainingItems;
        for (let i = startIndex; i < totalItems; i++) {
          (this._items[i] as HTMLElement).style.display = 'none';
        }
      }
    }
  }

  /**
   * Деструктор класса — отключает наблюдатель и освобождает ресурсы
   */
  public destroy(): void {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
  }
}

export default AdjustLastRow;
