import { useEffect, useState } from "react";

function useContextMenu(isEnabled = true) {
  const [contextMenu, setContextMenu] = useState(null);

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const onContextMenuOpen = (event) => {
    if (!isEnabled) return;

    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
    });
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

  return {
    contextMenu,
    onContextMenuOpen,
    closeContextMenu,
  };
}

export default useContextMenu;
