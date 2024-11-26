import { useEffect, useState } from "react";

export function useKeyboardShortcut(
  isOpen: boolean,
  onShortcut: () => void
) {
  const [shortcutKey, setShortcutKey] = useState("Ctrl");

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      /Mac|iPod|iPhone|iPad/.test(navigator.platform)
    ) {
      setShortcutKey("⌘");
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        onShortcut();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onShortcut]);

  return shortcutKey;
}
