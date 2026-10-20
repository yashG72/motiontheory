import { useEffect, useState } from "react";

const pad = (n) => String(n).padStart(2, "0");

// Running HH:MM:SS:FF timecode at 25 fps
export default function Timecode() {
  const [text, setText] = useState("00:00:00:00");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const frames = Math.floor((now - start) / 40);
      const s = Math.floor(frames / 25);
      setText(`${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(frames % 25)}`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <span className="timecode" aria-hidden="true">
      <span className="rec-dot"></span>REC <span>{text}</span>
    </span>
  );
}
