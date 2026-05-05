import { TreeNodeLeadingIcon } from "@/utils/treeIcons";
import { normalizeFiles, handleAddFile } from "@/utils/fileService";
import "./FileExplorer.css";

function FileExplorer({ directory = null, files = [], onAddFile }) {
  const items = normalizeFiles(files);
  const title = directory?.name ? `Папка: ${directory.name}` : "Папка не выбрана";

  const onAddFileClick = () => {
    handleAddFile(directory, onAddFile);
  };

  if (items.length === 0) {
    return (
      <div className="file-explorer file-explorer--empty" role="region" aria-label="Файлы">
        <div className="file-explorer__directory">
          <span>{title}</span>
          { directory && (
            <button
              className="file-explorer__add-button"
              onClick={onAddFileClick}
              title="Добавить новый файл"
              aria-label="Добавить новый файл"
            >
              +
            </button>
          )}
        </div>
        <p className="file-explorer__empty">
          { directory ? "В выбранной папке нет элементов." : "Нет файлов для отображения."}
        </p>
      </div>
    );
  }

  return (
    <div className="file-explorer" role="region" aria-label="Файлы">
      <div className="file-explorer__directory">
        <span>{title}</span>
        {directory && (
          <button
            className="file-explorer__add-button"
            onClick={onAddFileClick}
            title="Добавить новый файл"
            aria-label="Добавить новый файл"
          >
            Добавить файл
          </button>
        )}
      </div>
      <ul className="file-explorer__tiles" role="list">
        {items.map((file, index) => {
          const key = file.id ?? `${file.name ?? "item"}-${index}`;

          const hasChildren =
            Array.isArray(file.children) && file.children.length > 0;

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
                    hasChildren={hasChildren}
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
    </div>
  );
}

export default FileExplorer;