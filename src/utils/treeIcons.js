function getFileExtension(name = "") {
  const parts = name.split(".");
  if (parts.length < 2) return "";
  return parts[parts.length - 1].toLowerCase();
}

const extensionIcons = {
  js: "🟨",
  jsx: "⚛️",
  ts: "🔷",
  tsx: "🔹",
  css: "🎨",
  scss: "🎨",
  html: "🌐",
  md: "📝",
  json: "🧩",
  svg: "🖼️",
  png: "🖼️",
  jpg: "🖼️",
  jpeg: "🖼️",
  txt: "📄",
};

export function getNodeIcon(node, hasChildren, isOpen) {
  if (hasChildren) {
    return isOpen ? "📂" : "📁";
  }

  const extension = getFileExtension(node?.name);
  return extensionIcons[extension] ?? "📄";
}
