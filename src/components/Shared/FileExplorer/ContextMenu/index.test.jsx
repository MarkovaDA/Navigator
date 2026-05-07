import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import ContextMenu from "./index.jsx";

describe("ContextMenu", () => {
  it("does not render when contextMenu is null", () => {
    render(
      <ContextMenu
        contextMenu={null}
        onCreateFile={vi.fn()}
        onCreateFolder={vi.fn()}
      />
    );

    expect(
      screen.queryByRole("menu", { name: "Контекстное меню проводника" })
    ).not.toBeInTheDocument();
  });

  it("renders menu with action buttons and coordinates", () => {
    render(
      <ContextMenu
        contextMenu={{ x: 128, y: 64 }}
        onCreateFile={vi.fn()}
        onCreateFolder={vi.fn()}
      />
    );

    const menu = screen.getByRole("menu", { name: "Контекстное меню проводника" });

    expect(menu).toBeInTheDocument();
    expect(menu).toHaveStyle({ left: "128px", top: "64px" });
    expect(screen.getByRole("menuitem", { name: "Создать файл" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Создать папку" })).toBeInTheDocument();
  });

  it("calls handlers on menu item click", () => {
    const onCreateFile = vi.fn();
    const onCreateFolder = vi.fn();

    render(
      <ContextMenu
        contextMenu={{ x: 0, y: 0 }}
        onCreateFile={onCreateFile}
        onCreateFolder={onCreateFolder}
      />
    );

    fireEvent.click(screen.getByRole("menuitem", { name: "Создать файл" }));
    fireEvent.click(screen.getByRole("menuitem", { name: "Создать папку" }));

    expect(onCreateFile).toHaveBeenCalledTimes(1);
    expect(onCreateFolder).toHaveBeenCalledTimes(1);
  });

  it("stops click propagation inside menu container", () => {
    render(
      <ContextMenu
        contextMenu={{ x: 0, y: 0 }}
        onCreateFile={vi.fn()}
        onCreateFolder={vi.fn()}
      />
    );

    const menu = screen.getByRole("menu", { name: "Контекстное меню проводника" });
    const event = new MouseEvent("click", { bubbles: true, cancelable: true });
    const stopPropagationSpy = vi.spyOn(event, "stopPropagation");

    menu.dispatchEvent(event);

    expect(stopPropagationSpy).toHaveBeenCalledTimes(1);
  });
});
