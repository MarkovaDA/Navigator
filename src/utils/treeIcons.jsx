import ArticleOutlined from "@mui/icons-material/ArticleOutlined";
import CssOutlined from "@mui/icons-material/CssOutlined";
import DataObjectOutlined from "@mui/icons-material/DataObjectOutlined";
import DescriptionOutlined from "@mui/icons-material/DescriptionOutlined";
import FolderOpen from "@mui/icons-material/FolderOpen";
import Folder from "@mui/icons-material/Folder";
import HtmlOutlined from "@mui/icons-material/HtmlOutlined";
import ImageOutlined from "@mui/icons-material/ImageOutlined";
import IntegrationInstructionsOutlined from "@mui/icons-material/IntegrationInstructionsOutlined";
import JavascriptOutlined from "@mui/icons-material/JavascriptOutlined";

function getFileExtension(name = "") {
  const parts = name.split(".");
  if (parts.length < 2) return "";
  return parts[parts.length - 1].toLowerCase();
}

const extensionIconComponents = {
  js: JavascriptOutlined,
  jsx: JavascriptOutlined,
  ts: IntegrationInstructionsOutlined,
  tsx: IntegrationInstructionsOutlined,
  css: CssOutlined,
  scss: CssOutlined,
  html: HtmlOutlined,
  md: ArticleOutlined,
  json: DataObjectOutlined,
  svg: ImageOutlined,
  png: ImageOutlined,
  jpg: ImageOutlined,
  jpeg: ImageOutlined,
  txt: DescriptionOutlined,
};

/** Material-style accent per extension / folder (readable on light backgrounds). */
const extensionColors = {
  js: "#F9A825",
  jsx: "#FDD835",
  ts: "#1976D2",
  tsx: "#1565C0",
  css: "#264DE4",
  scss: "#1565C0",
  html: "#E65100",
  md: "#6A1B9A",
  json: "#2E7D32",
  svg: "#C2185B",
  png: "#AD1457",
  jpg: "#C62828",
  jpeg: "#C62828",
  txt: "#546E7A",
};

/** Закрашенные папки (filled): яркий жёлтый, открытая чуть светлее. */
const folderIconColors = {
  closed: "#FFC107",
  open: "#FFEA00",
};

const defaultFileColor = "#757575";

function getLeadingIconColor(node, hasChildren, isOpen) {
  if (hasChildren) {
    return isOpen ? folderIconColors.open : folderIconColors.closed;
  }
  const ext = getFileExtension(node?.name);
  return extensionColors[ext] ?? defaultFileColor;
}

export function TreeNodeLeadingIcon({ node, hasChildren, isOpen }) {
  const Cmp = hasChildren
    ? isOpen
      ? FolderOpen
      : Folder
    : extensionIconComponents[getFileExtension(node?.name)] ??
      DescriptionOutlined;

  const color = getLeadingIconColor(node, hasChildren, isOpen);

  return (
    <Cmp
      sx={{
        fontSize: 18,
        color,
        flexShrink: 0,
      }}
      aria-hidden
    />
  );
}
