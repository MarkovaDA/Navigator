import { useRef, useState } from "react";

function SplitView({ left, right, initialLeftWidth = 280, minLeft = 180, minRight = 220 }) {
  const containerRef = useRef(null);
  const [leftWidth, setLeftWidth] = useState(initialLeftWidth);
  const dragStateRef = useRef({
    dragging: false,
    startX: 0,
    startWidth: initialLeftWidth,
  });

  const onMouseDown = (event) => {
    dragStateRef.current = {
      dragging: true,
      startX: event.clientX,
      startWidth: leftWidth,
    };
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const onMouseMove = (event) => {
    if (!dragStateRef.current.dragging || !containerRef.current) {
      return;
    }

    const deltaX = event.clientX - dragStateRef.current.startX;
    const containerWidth = containerRef.current.getBoundingClientRect().width;
    const maxLeft = Math.max(minLeft, containerWidth - minRight);

    const nextWidth = Math.min(
      maxLeft,
      Math.max(minLeft, dragStateRef.current.startWidth + deltaX),
    );

    setLeftWidth(nextWidth);
  };

  const onMouseUp = () => {
    if (!dragStateRef.current.dragging) {
      return;
    }
    dragStateRef.current.dragging = false;
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  };

  return (
    <div
      ref={containerRef}
      style={{ display: "flex", width: "100%", height: "100%" }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <div style={{ width: leftWidth, minWidth: minLeft, overflow: "auto", padding: "12px" }}>
        {left}
      </div>

      <div
        role="separator"
        aria-orientation="vertical"
        onMouseDown={onMouseDown}
        style={{
          width: "8px",
          cursor: "col-resize",
          background: "#e5e7eb",
          borderLeft: "1px solid #d1d5db",
          borderRight: "1px solid #d1d5db",
          flexShrink: 0,
        }}
      />

      <div style={{ flex: 1, minWidth: minRight, overflow: "auto", padding: "12px" }}>{right}</div>
    </div>
  );
}

export default SplitView;
