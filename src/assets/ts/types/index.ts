// src/assets/js/types/index.ts

export interface IAdjustLastRow {
  run(): void;
  getColumns(): number | null;
  destroy(): void;
}
