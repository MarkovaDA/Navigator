function ContextMenu({ contextMenu, onCreateFile, onCreateFolder }) {
  if (!contextMenu) return null;

  return (
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
        onClick={onCreateFile}
      >
        Создать файл
      </button>
      <button
        className="file-explorer__context-menu-item"
        type="button"
        role="menuitem"
        onClick={onCreateFolder}
      >
        Создать папку
      </button>
    </div>
  );
}

export default ContextMenu;
