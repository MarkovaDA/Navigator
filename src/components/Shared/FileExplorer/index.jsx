import { TreeNodeLeadingIcon } from "@/utils/treeIcons";
import { normalizeFiles, handleAddFile, handleAddFolder } from "@/utils/fileService";

import ContextMenu from "./ContextMenu/index.jsx";
import useContextMenu from "./ContextMenu/useContextMenu";

import "./FileExplorer.css";

function FileExplorer({ directory = null, files = [], onAddFile, onAddFolder }) {
  const items = normalizeFiles(files);
  const title = directory?.name ? `Папка: ${directory.name}` : "Папка не выбрана";
  const helperText = "Используйте контекстное меню для создания папки или файла";

  const { contextMenu, onContextMenuOpen, closeContextMenu } = useContextMenu(Boolean(directory));

  const onAddFileClick = () => {
    handleAddFile(directory, onAddFile);
  };

  const onAddFolderClick = () => {
    handleAddFolder(directory, onAddFolder);
  };

  const onCreateFileFromContextMenu = () => {
    closeContextMenu();
    onAddFileClick();
  };

  const onCreateFolderFromContextMenu = () => {
    closeContextMenu();
    onAddFolderClick();
  };

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

        <ContextMenu
          contextMenu={contextMenu}
          onCreateFile={onCreateFileFromContextMenu}
          onCreateFolder={onCreateFolderFromContextMenu}
        />
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
      
      <ContextMenu
        contextMenu={contextMenu}
        onCreateFile={onCreateFileFromContextMenu}
        onCreateFolder={onCreateFolderFromContextMenu}
      />
    </div>
  );
}

export default FileExplorer;