import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import SplitView from "./index.jsx";

describe("SplitView", () => {
  it("renders left and right content", () => {
    render(
      <SplitView
        left={<div>Левая панель</div>}
        right={<div>Правая панель</div>}
      />
    );

    expect(screen.getByText("Левая панель")).toBeInTheDocument();
    expect(screen.getByText("Правая панель")).toBeInTheDocument();
  });

  it("renders vertical separator", () => {
    render(
      <SplitView
        left={<div>Левая панель</div>}
        right={<div>Правая панель</div>}
      />
    );

    const separator = screen.getByRole("separator");

    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute("aria-orientation", "vertical");
  });

  it("applies initial width and minimum pane sizes", () => {
    const { container } = render(
      <SplitView
        left={<div>Левая панель</div>}
        right={<div>Правая панель</div>}
        initialLeftWidth={320}
        minLeft={200}
        minRight={260}
      />
    );

    const leftPane = container.querySelector(".split-view__left");
    const rightPane = container.querySelector(".split-view__right");

    expect(leftPane).toHaveStyle({
      "--split-left-width": "320px",
      "--split-min-left": "200px",
    });
    
    expect(rightPane).toHaveStyle({
      "--split-min-right": "260px",
    });
  });
});
