import React from "react";

export function DyslexiaFriendlyText({ children, className = "", as: Component = "p" }) {
  return <Component className={`tracking-wide leading-relaxed ${className}`}>{children}</Component>;
}
