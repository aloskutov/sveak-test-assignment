import browserSync from 'browser-sync';

// Создаем экземпляр BrowserSync
const bs = browserSync.create();

// Экспортируем его для использования в других файлах
export { bs };
