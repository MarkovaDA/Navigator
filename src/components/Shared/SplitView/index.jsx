import { useRef, useState } from "react";
import "./SplitView.css";

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
      className="split-view"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <div
        className="split-view__left"
        style={{
          "--split-left-width": `${leftWidth}px`,
          "--split-min-left": `${minLeft}px`,
        }}
      >
        {left}
      </div>

      <div
        role="separator"
        aria-orientation="vertical"
        className="split-view__separator"
        onMouseDown={onMouseDown}
      />

      <div
        className="split-view__right"
        style={{ "--split-min-right": `${minRight}px` }}
      >
        {right}
      </div>
    </div>
  );
}

export default SplitView;
