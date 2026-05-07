import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import TreeView from "./index.jsx";

const treeData = [
  {
    id: "src",
    name: "src",
    children: [
      { id: "app", name: "App.jsx" },
      {
        id: "components",
        name: "components",
        children: [{ id: "button", name: "Button.jsx" }],
      },
    ],
  },
  { id: "package", name: "package.json" },
];

describe("TreeView", () => {
  it("renders empty message when data is empty", () => {
    render(<TreeView data={[]} />);

    expect(screen.getByText("Нет папок для отображения.")).toBeInTheDocument();
  });

  it("renders tree with nested nodes", () => {
    render(<TreeView data={treeData} />);

    const tree = screen.getByRole("tree");

    expect(within(tree).getByRole("treeitem", { name: "src" })).toBeInTheDocument();
    expect(within(tree).getByRole("treeitem", { name: "App.jsx" })).toBeInTheDocument();
    expect(within(tree).getByRole("treeitem", { name: "components" })).toBeInTheDocument();
    expect(within(tree).getByRole("treeitem", { name: "Button.jsx" })).toBeInTheDocument();
    expect(within(tree).getByRole("treeitem", { name: "package.json" })).toBeInTheDocument();
  });

  it("marks selected node", () => {
    render(<TreeView data={treeData} selectedId="components" />);

    expect(screen.getByRole("treeitem", { name: "components" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(screen.getByRole("treeitem", { name: "src" })).toHaveAttribute(
      "aria-selected",
      "false"
    );
  });

  it("calls onSelect and collapses folder on click", () => {
    const onSelect = vi.fn();
    render(<TreeView data={treeData} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole("treeitem", { name: "src" }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(treeData[0]);
    expect(screen.getByRole("treeitem", { name: "src" })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
    
    expect(screen.queryByRole("treeitem", { name: "App.jsx" })).not.toBeInTheDocument();
  });

  it("activates node with Enter", () => {
    const onSelect = vi.fn();
    render(<TreeView data={treeData} onSelect={onSelect} />);

    fireEvent.keyDown(screen.getByRole("treeitem", { name: "package.json" }), {
      key: "Enter",
    });

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(treeData[1]);
  });
});
