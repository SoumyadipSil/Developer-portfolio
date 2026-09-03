"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@once-ui-system/core";

export function ThemeToggle() {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = document.documentElement.getAttribute("data-theme") || "light";
    setTheme(savedTheme);
    
    // Create an observer to listen for external theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "data-theme") {
          const newTheme = document.documentElement.getAttribute("data-theme") || "light";
          setTheme(newTheme);
        }
      });
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });
    
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("data-theme", newTheme);
  };

  if (!mounted) {
    return <div style={{ width: "44px", height: "44px", opacity: 0 }}></div>;
  }

  return (
    <Button
      variant="tertiary"
      weight="default"
      onClick={toggleTheme}
      className="nav-btn-hover"
      aria-label="Toggle Theme"
      title="Toggle Theme"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
        minWidth: "44px",
        height: "44px",
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.01))",
        backdropFilter: "blur(24px) saturate(150%)",
        WebkitBackdropFilter: "blur(24px) saturate(150%)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderTop: "1px solid rgba(255, 255, 255, 0.15)",
        borderLeft: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        borderRadius: "12px",
      }}
    >
      {theme === "light" ? (
        <Moon size={20} color="#666666" />
      ) : (
        <Sun size={20} color="#ffffff" />
      )}
    </Button>
  );
}
