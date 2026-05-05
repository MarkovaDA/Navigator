import { useEffect, useState } from "react";
import { TreeNodeLeadingIcon } from "@/utils/treeIcons";
import { normalizeFiles, handleAddFile, handleAddFolder } from "@/utils/fileService";
import "./FileExplorer.css";

function FileExplorer({ directory = null, files = [], onAddFile, onAddFolder }) {
  const items = normalizeFiles(files);
  const title = directory?.name ? `Папка: ${directory.name}` : "Папка не выбрана";
  const helperText = "Используйте контекстное меню для создания папки или файла";
  const [contextMenu, setContextMenu] = useState(null);

  const onAddFileClick = () => {
    handleAddFile(directory, onAddFile);
  };

  const onAddFolderClick = () => {
    handleAddFolder(directory, onAddFolder);
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const onContextMenuOpen = (event) => {
    if (!directory) return;

    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const onCreateFileFromContextMenu = () => {
    closeContextMenu();
    onAddFileClick();
  };

  const onCreateFolderFromContextMenu = () => {
    closeContextMenu();
    onAddFolderClick();
  };

  useEffect(() => {
    if (!contextMenu) return undefined;

    const handleWindowClick = () => {
      closeContextMenu();
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeContextMenu();
      }
    };

    window.addEventListener("click", handleWindowClick);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("click", handleWindowClick);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [contextMenu]);

  const contextMenuContent = contextMenu ? (
    <div
      className="file-explorer__context-menu"
      style={{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }}
      role="menu"
      aria-label="Контекстное меню проводника"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        className="file-explorer__context-menu-item"
        type="button"
        role="menuitem"
        onClick={onCreateFileFromContextMenu}
      >
        Создать файл
      </button>
      <button
        className="file-explorer__context-menu-item"
        type="button"
        role="menuitem"
        onClick={onCreateFolderFromContextMenu}
      >
        Создать папку
      </button>
    </div>
  ) : null;

  if (items.length === 0) {
    return (
      <div
        className="file-explorer file-explorer--empty"
        role="region"
        aria-label="Файлы"
        onContextMenu={onContextMenuOpen}
      >
        <div className="file-explorer__directory">
          <span>{title}</span>
          <p className="file-explorer__hint">{helperText}</p>
        </div>
        <p className="file-explorer__empty">
          { directory ? "В выбранной папке нет элементов." : "Нет файлов для отображения."}
        </p>
        {contextMenuContent}
      </div>
    );
  }

  return (
    <div
      className="file-explorer"
      role="region"
      aria-label="Файлы"
      onContextMenu={onContextMenuOpen}
    >
      <div className="file-explorer__directory">
        <span>{title}</span>
        <p className="file-explorer__hint">{helperText}</p>
      </div>
      <ul className="file-explorer__tiles" role="list">
        {items.map((file, index) => {
          const key = file.id ?? `${file.name ?? "item"}-${index}`;

          const hasChildren =
            Array.isArray(file.children) && file.children.length > 0;
          const isFolderItem =
            file?.isFolder === true || Array.isArray(file?.children);

          return (
            <li
              key={key}
              className="file-explorer__tile"
              role="listitem"
              style={{ "--file-explorer-tile-delay": `${Math.min(index * 42, 420)}ms` }}
            >
              <div className="file-explorer__tile-body">
                <span className="file-explorer__tile-icon" aria-hidden>
                  <TreeNodeLeadingIcon
                    node={file}
                    hasChildren={isFolderItem || hasChildren}
                    isOpen={false}
                  />
                </span>
                <span className="file-explorer__tile-name" title={file.name}>
                  {file.name ?? "Без названия"}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
      {contextMenuContent}
    </div>
  );
}

export default FileExplorer;