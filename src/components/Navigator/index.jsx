import { useState } from "react";
import SplitView from "../Shared/SplitView";
import TreeView from "../Shared/TreeView";
import FileExplorer from "../Shared/FileExplorer";
import "./Navigator.css";

const demoTree = [
  {
    id: "src",
    name: "src",
    children: [
      {
        id: "components",
        name: "components",
        children: [
          { id: "layout", name: "Layout" },
          { id: "common", name: "Common" },
          {
            id: "shared",
            name: "Shared",
            children: [
              { id: "tree-view", name: "TreeView.jsx" },
              { id: "split-view", name: "SplitView.jsx" },
              { id: "toolbar", name: "Toolbar.jsx" },
            ],
          },
          {
            id: "pages",
            name: "Pages",
            children: [
              { id: "dashboard-page", name: "DashboardPage.jsx" },
              { id: "settings-page", name: "SettingsPage.jsx" },
              { id: "profile-page", name: "ProfilePage.jsx" },
            ],
          },
        ],
      },
      {
        id: "hooks",
        name: "hooks",
        children: [
          { id: "use-fetch", name: "useFetch.js" },
          { id: "use-local-storage", name: "useLocalStorage.js" },
          { id: "use-resize-observer", name: "useResizeObserver.js" },
        ],
      },
      {
        id: "services",
        name: "services",
        children: [
          { id: "api", name: "api.js" },
          { id: "auth", name: "auth.js" },
          { id: "logger", name: "logger.js" },
          {
            id: "modules",
            name: "modules",
            children: [
              { id: "users-module", name: "users.js" },
              { id: "projects-module", name: "projects.js" },
              { id: "tasks-module", name: "tasks.js" },
            ],
          },
        ],
      },
      {
        id: "utils",
        name: "utils",
        children: [
          { id: "date-utils", name: "date.js" },
          { id: "format-utils", name: "format.js" },
          { id: "validators-utils", name: "validators.js" },
        ],
      },
      { id: "styles", name: "styles" },
    ],
  },
  {
    id: "public",
    name: "public",
    children: [
      {
        id: "assets",
        name: "assets",
        children: [
          { id: "icons", name: "icons" },
          { id: "images", name: "images" },
          { id: "fonts", name: "fonts" },
        ],
      },
      { id: "favicon", name: "favicon.svg" },
      { id: "robots", name: "robots.txt" },
    ],
  },
  {
    id: "tests",
    name: "tests",
    children: [
      { id: "unit", name: "unit" },
      { id: "integration", name: "integration" },
      { id: "e2e", name: "e2e" },
    ],
  },
  {
    id: "docs",
    name: "docs",
    children: [
      { id: "architecture", name: "architecture.md" },
      { id: "contributing", name: "contributing.md" },
      { id: "changelog", name: "changelog.md" },
    ],
  },
];

function findNodeById(nodes, targetId) {
  if (!Array.isArray(nodes) || !targetId) return null;

  for (const node of nodes) {
    if (node?.id === targetId) {
      return node;
    }

    const foundInChildren = findNodeById(node?.children, targetId);
    if (foundInChildren) {
      return foundInChildren;
    }
  }

  return null;
}

function addFileToFolder(nodes, folderId, fileName) {
  if (!Array.isArray(nodes)) return nodes;

  return nodes.map((node) => {
    if (node?.id === folderId) {
      const nextChildren = Array.isArray(node.children) ? node.children : [];
      
      return {
        ...node,
        children: [
          ...nextChildren,
          {
            id: `file-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            name: fileName,
          },
        ],
      };
    }

    if (!Array.isArray(node?.children)) {
      return node;
    }

    return {
      ...node,
      children: addFileToFolder(node.children, folderId, fileName),
    };
  });
}

function Navigator() {
  const [treeData, setTreeData] = useState(demoTree);
  const [selectedFolderId, setSelectedFolderId] = useState(demoTree[0]?.id ?? null);
  const selectedFolder = findNodeById(treeData, selectedFolderId);

  const handleSelectFolder = (node) => {
    setSelectedFolderId(node?.id ?? null);
  };

  const handleAddFile = (rawFileName) => {
    const fileName = rawFileName.trim();
    const currentChildren = Array.isArray(selectedFolder?.children)
      ? selectedFolder.children
      : [];
    const alreadyExists = currentChildren.some(
      (item) => item?.name?.toLowerCase() === fileName.toLowerCase()
    );

    if (alreadyExists) {
      window.alert("Файл с таким названием уже существует в выбранной папке.");
      return false;
    }

    setTreeData((prevTreeData) => addFileToFolder(prevTreeData, selectedFolder?.id, fileName));
    return true;
  };

  return (
    <div className="navigator">
      <SplitView
        left={
          <div>
            <TreeView
              data={treeData}
              selectedId={selectedFolder?.id}
              onSelect={handleSelectFolder}
            />
          </div>
        }
        right={
          <section
            className="navigator__content-shell"
            aria-label="Контейнер содержимого"
          >
            <FileExplorer
              directory={selectedFolder}
              files={selectedFolder?.children ?? []}
              onAddFile={handleAddFile}
            />
          </section>
        }
      />
    </div>
  );
}

export default Navigator;
