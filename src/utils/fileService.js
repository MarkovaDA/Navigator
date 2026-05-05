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

/**
 * Получает имя папки у пользователя через диалоговое окно
 * @returns {string|null} Имя папки или null если пользователь отменил
 */
export function getFolderNameFromUser() {
  const folderName = window.prompt("Введите название новой папки:");
  if (folderName == null) return null;

  const trimmedFolderName = folderName.trim();
  
  if (!trimmedFolderName) {
    window.alert("Название папки не может быть пустым.");
    return null;
  }

  return trimmedFolderName;
}

/**
 * Обрабатывает добавление новой папки
 * @param {Object} directory - Текущая папка
 * @param {Function} onAddFolder - Callback функция для добавления папки
 */
export function handleAddFolder(directory, onAddFolder) {
  if (!directory || typeof onAddFolder !== "function") return;

  const folderName = getFolderNameFromUser();

  if (folderName) {
    onAddFolder(folderName);
  }
}

/**
 * Находит узел по id в дереве
 * @param {Array} nodes - Узлы дерева
 * @param {string} targetId - Искомый id
 * @returns {Object|null} Найденный узел или null
 */
export function findNodeById(nodes, targetId) {
  if (!Array.isArray(nodes) || !targetId) return null;

  for (const node of nodes) {
    if (node?.id === targetId) {
      return node;
    }

    const foundInChildren = findNodeById(node?.children, targetId);
    if (foundInChildren) {
      return foundInChildren;
    }
  }

  return null;
}

/**
 * Добавляет файл в выбранную папку дерева
 * @param {Array} nodes - Узлы дерева
 * @param {string} folderId - id папки
 * @param {string} fileName - Имя файла
 * @returns {Array} Новое дерево
 */
export function addFileToFolder(nodes, folderId, fileName) {
  if (!Array.isArray(nodes)) return nodes;

  return nodes.map((node) => {
    if (node?.id === folderId) {
      const nextChildren = Array.isArray(node.children) ? node.children : [];

      return {
        ...node,
        children: [
          ...nextChildren,
          {
            id: `file-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            name: fileName,
          },
        ],
      };
    }

    if (!Array.isArray(node?.children)) {
      return node;
    }

    return {
      ...node,
      children: addFileToFolder(node.children, folderId, fileName),
    };
  });
}

/**
 * Добавляет папку в выбранную папку дерева
 * @param {Array} nodes - Узлы дерева
 * @param {string} folderId - id папки
 * @param {string} folderName - Имя папки
 * @returns {Array} Новое дерево
 */
export function addFolderToFolder(nodes, folderId, folderName) {
  if (!Array.isArray(nodes)) return nodes;

  return nodes.map((node) => {
    if (node?.id === folderId) {
      const nextChildren = Array.isArray(node.children) ? node.children : [];

      return {
        ...node,
        children: [
          ...nextChildren,
          {
            id: `folder-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            name: folderName,
            isFolder: true,
            children: [],
          },
        ],
      };
    }

    if (!Array.isArray(node?.children)) {
      return node;
    }

    return {
      ...node,
      children: addFolderToFolder(node.children, folderId, folderName),
    };
  });
}
