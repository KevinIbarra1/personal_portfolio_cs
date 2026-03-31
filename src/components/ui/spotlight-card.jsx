"use client";
import { useEffect, useRef } from "react";

const glowColorMap = {
  blue:   { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green:  { base: 120, spread: 200 },
  red:    { base: 0,   spread: 200 },
  orange: { base: 30,  spread: 200 },
  gold:   { base: 43,  spread: 150 },
};

export function GlowCard({ children, className = "", glowColor = "gold" }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const syncPointer = ({ clientX: x, clientY: y }) => {
      if (!cardRef.current) return;
      cardRef.current.style.setProperty("--x", x.toFixed(2));
      cardRef.current.style.setProperty("--xp", (x / window.innerWidth).toFixed(2));
      cardRef.current.style.setProperty("--y", y.toFixed(2));
      cardRef.current.style.setProperty("--yp", (y / window.innerHeight).toFixed(2));
    };
    document.addEventListener("pointermove", syncPointer);
    return () => document.removeEventListener("pointermove", syncPointer);
  }, []);

  const { base, spread } = glowColorMap[glowColor] ?? glowColorMap.gold;

  return (
    <div
      ref={cardRef}
      data-glow
      style={{
        "--base": base,
        "--spread": spread,
        "--radius": "16",
        "--border": "1",
        "--backdrop": "#111009",
        "--backup-border": "#1e1c14",
        "--size": "300",
        "--outer": "1",
        "--border-size": "calc(var(--border, 1) * 1px)",
        "--spotlight-size": "calc(var(--size, 300) * 1px)",
        "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
        backgroundImage: `radial-gradient(
          var(--spotlight-size) var(--spotlight-size) at
          calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
          hsl(var(--hue, 43) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.07)),
          transparent
        )`,
        backgroundColor: "var(--backdrop)",
        backgroundSize: "calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))",
        backgroundPosition: "50% 50%",
        backgroundAttachment: "fixed",
        border: "var(--border-size) solid var(--backup-border)",
        position: "relative",
        touchAction: "none",
      }}
      className={`rounded-2xl ${className}`}
    >
      <div data-glow />
      {children}
    </div>
  );
}
