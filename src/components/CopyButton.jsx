import { useRef, useState } from "react";

// Copies `value`; if the clipboard is blocked, selects the text in `targetId` instead
export default function CopyButton({ value, targetId, children }) {
  const [label, setLabel] = useState(null);
  const timer = useRef();

  const flash = (text, ms) => {
    setLabel(text);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setLabel(null), ms);
  };

  const selectTarget = () => {
    const el = targetId && document.getElementById(targetId);
    if (!el) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    flash("Selected, press Ctrl+C", 2200);
  };

  const onClick = () => {
    try {
      navigator.clipboard.writeText(value).then(() => flash("Copied", 1600), selectTarget);
    } catch {
      selectTarget();
    }
  };

  return (
    <button className="copy-btn" type="button" onClick={onClick}>
      {label || children}
    </button>
  );
}
