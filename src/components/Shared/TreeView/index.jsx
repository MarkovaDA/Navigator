import { useState } from "react";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import { TreeNodeLeadingIcon } from "@/utils/treeIcons";
import "./TreeView.css";

function normalizeNodes(data) {
  if (!data) return [];
  return Array.isArray(data) ? data : [data];
}

const treeIconSx = {
  fontSize: 18,
  color: "var(--tree-view-icon-muted, #5f6368)",
  flexShrink: 0,
};

function TreeNode({ node, level = 0, selectedId, onSelect }) {
  const children = Array.isArray(node.children) ? node.children : [];
  const hasChildren = children.length > 0;
  const isFolderNode = node?.isFolder === true || Array.isArray(node?.children);
  const [isOpen, setIsOpen] = useState(true);
  const isSelected = node.id != null && node.id === selectedId;

  const handleActivate = () => {
    if (hasChildren) {
      setIsOpen((value) => !value);
    }
    onSelect?.(node);
  };

  return (
    <li className="tree-view__item" role="none">
      <div
        className={`tree-view__row${hasChildren ? " tree-view__row--clickable" : ""}${isSelected ? " tree-view__row--selected" : ""}`}
        onClick={handleActivate}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleActivate();
          }
        }}
        style={{ "--tree-level": level }}
        role="treeitem"
        tabIndex={0}
        aria-expanded={hasChildren ? isOpen : undefined}
        aria-selected={isSelected}
      >
        <span className="tree-view__toggle" aria-hidden="true">
          {hasChildren ? (
            isOpen ? (
              <ExpandMoreRounded sx={treeIconSx} />
            ) : (
              <ChevronRightRounded sx={treeIconSx} />
            )
          ) : (
            <span className="tree-view__toggle-spacer" />
          )}
        </span>
        <span className="tree-view__icon-wrap" aria-hidden="true">
          <TreeNodeLeadingIcon
            node={node}
            hasChildren={isFolderNode || hasChildren}
            isOpen={isOpen}
          />
        </span>
        <span className="tree-view__label">{node.name ?? "Без названия"}</span>
      </div>

      {hasChildren && isOpen && (
        <ul className="tree-view__list" role="group">
          {children.map((child, index) => (
            <TreeNode
              key={child.id ?? `${child.name ?? "folder"}-${index}`}
              node={child}
              level={level + 1}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function TreeView({ data, selectedId, onSelect }) {
  const nodes = normalizeNodes(data);

  if (nodes.length === 0) {
    return <p className="tree-view__empty">Нет папок для отображения.</p>;
  }

  return (
    <ul className="tree-view__list tree-view__root" role="tree">
      {nodes.map((node, index) => (
        <TreeNode
          key={node.id ?? `${node.name ?? "folder"}-${index}`}
          node={node}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}

export default TreeView;
