"use client";
import { useFade } from "./hooks";

export default function FadeBox({ children, delay = 0, style = {} }) {
  const { ref, vis } = useFade();
  return (
    <div
      ref={ref}
      className="fade-up"
      style={{
        ...(vis ? { opacity: 1, transform: "none" } : {}),
        transitionDelay: `${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
