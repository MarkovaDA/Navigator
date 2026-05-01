import { useState } from "react";
import { getNodeIcon } from "@/utils/treeIcons";

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
    <li style={{ listStyle: "none" }}>
      <div
        onClick={() => hasChildren && setIsOpen((value) => !value)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          cursor: hasChildren ? "pointer" : "default",
          padding: "4px 0",
          paddingLeft: `${level * 14}px`,
          userSelect: "none",
        }}
      >
        <span style={{ width: "12px", color: "#6b7280" }}>{hasChildren ? (isOpen ? "▾" : "▸") : ""}</span>
        <span>
          {icon} {node.name ?? "Без названия"}
        </span>
      </div>

      {hasChildren && isOpen && (
        <ul style={{ margin: 0, padding: 0 }}>
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
    return <p style={{ margin: 0, color: "#6b7280" }}>Нет папок для отображения.</p>;
  }

  return (
    <ul style={{ margin: 0, padding: 0 }}>
      {nodes.map((node, index) => (
        <TreeNode key={node.id ?? `${node.name ?? "folder"}-${index}`} node={node} />
      ))}
    </ul>
  );
}

export default TreeView;



