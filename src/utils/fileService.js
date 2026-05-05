/**
 * Нормализует массив файлов
 * @param {Array|null} files - Массив файлов или null
 * @returns {Array} Нормализованный массив
 */
export function normalizeFiles(files) {
  if (files == null) return [];
  return Array.isArray(files) ? files : [];
}

/**
 * Получает имя файла у пользователя через диалоговое окно
 * @returns {string|null} Имя файла или null если пользователь отменил
 */
export function getFileNameFromUser() {
  const fileName = window.prompt("Введите название нового файла:");
  if (fileName == null) return null;

  const trimmedFileName = fileName.trim();
  if (!trimmedFileName) {
    window.alert("Название файла не может быть пустым.");
    return null;
  }

  return trimmedFileName;
}

/**
 * Обрабатывает добавление нового файла
 * @param {Object} directory - Текущая папка
 * @param {Function} onAddFile - Callback функция для добавления файла
 */
export function handleAddFile(directory, onAddFile) {
  if (!directory || typeof onAddFile !== "function") return;

  const fileName = getFileNameFromUser();
  if (fileName) {
    onAddFile(fileName);
  }
}
