import { useState } from "react";
import { getNodeIcon } from "@/utils/treeIcons";
import "./TreeView.css";

function normalizeNodes(data) {
  if (!data) return [];
  return Array.isArray(data) ? data : [data];
}

function TreeNode({ node, level = 0 }) {
  const children = Array.isArray(node.children) ? node.children : [];
  const hasChildren = children.length > 0;
  const [isOpen, setIsOpen] = useState(true);
  const icon = getNodeIcon(node, hasChildren, isOpen);

  return (
    <li className="tree-view__item">
      <div
        className={`tree-view__row${hasChildren ? " tree-view__row--clickable" : ""}`}
        onClick={() => hasChildren && setIsOpen((value) => !value)}
        style={{ "--tree-level": level }}
      >
        <span className="tree-view__toggle">{hasChildren ? (isOpen ? "▾" : "▸") : ""}</span>
        <span>
          {icon} {node.name ?? "Без названия"}
        </span>
      </div>

      {hasChildren && isOpen && (
        <ul className="tree-view__list">
          {children.map((child, index) => (
            <TreeNode
              key={child.id ?? `${child.name ?? "folder"}-${index}`}
              node={child}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function TreeView({ data }) {
  const nodes = normalizeNodes(data);

  if (nodes.length === 0) {
    return <p className="tree-view__empty">Нет папок для отображения.</p>;
  }

  return (
    <ul className="tree-view__list">
      {nodes.map((node, index) => (
        <TreeNode key={node.id ?? `${node.name ?? "folder"}-${index}`} node={node} />
      ))}
    </ul>
  );
}

export default TreeView;
