import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Opening titles, played once per page load. The logo's O draws itself in the
// middle of a dark frame, then glides into place as the rest of the logo opens
// out around it. After a short hold the frame fades away.
// index.html adds the "intro" class to <html> before anything paints; without
// it (reduced motion) this renders nothing.

const HOLD = 3200; // ms from start until the fade begins
const FADE = 900; // ms for the fade-out

// The O with its bar, drawn as strokes so it can draw itself in
function DrawnO() {
  return (
    <svg className="intro-o" viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="46" pathLength="1" />
      <line x1="28" y1="50" x2="72" y2="50" pathLength="1" />
    </svg>
  );
}

export default function Intro() {
  const [phase, setPhase] = useState(() =>
    document.documentElement.classList.contains("intro") ? "in" : "done"
  );
  const logoRef = useRef(null);
  const oRef = useRef(null);

  // Start with the O at the centre of the screen: offset the logo by the
  // distance from its centre to the O's centre
  useLayoutEffect(() => {
    if (phase !== "in") return;
    const measure = () => {
      const logo = logoRef.current, o = oRef.current;
      if (!logo || !o) return;
      // Layout offsets (unaffected by the running transform); the logo is the O's offsetParent
      logo.style.setProperty("--dx", `${logo.offsetWidth / 2 - (o.offsetLeft + o.offsetWidth / 2)}px`);
      logo.style.setProperty("--dy", `${logo.offsetHeight / 2 - (o.offsetTop + o.offsetHeight / 2)}px`);
    };
    measure();
    document.fonts?.ready.then(measure);
  }, [phase]);

  useEffect(() => {
    if (phase !== "in") return;
    const fade = () => setPhase("out");
    const t = setTimeout(fade, HOLD);
    // Any click or key skips straight to the fade
    window.addEventListener("pointerdown", fade);
    window.addEventListener("keydown", fade);
    return () => {
      clearTimeout(t);
      window.removeEventListener("pointerdown", fade);
      window.removeEventListener("keydown", fade);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "out") return;
    // Let the page's own entrance play as the frame fades
    document.documentElement.classList.remove("intro");
    const t = setTimeout(() => setPhase("done"), FADE);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "done") return null;

  // Letters of MOTION open out from the O (index 1): --d is the side and
  // distance from it, which sets each letter's direction and delay
  const top = "MOTION".split("").map((ch, i) =>
    i === 1 ? (
      <span className="intro-char intro-char-o" ref={oRef} key={i}><DrawnO /></span>
    ) : (
      <span className="intro-char" style={{ "--d": i - 1, "--k": Math.abs(i - 1) }} key={i}>{ch}</span>
    )
  );

  return (
    <div className={`intro-screen${phase === "out" ? " is-out" : ""}`} role="img" aria-label="MotionTheory">
      <div className="intro-grain" aria-hidden="true"></div>
      <div className="intro-logo" ref={logoRef} aria-hidden="true">
        <span className="intro-line">{top}</span>
        <span className="intro-line intro-line-2">THEORY</span>
        <span className="intro-tagline">Visuals <i>|</i> Ideas <i>|</i> Impact</span>
      </div>
      <div className="intro-bar" aria-hidden="true">
        <span className="intro-track"><span></span></span>
        <span className="intro-meta">motiontheory.media</span>
        <span className="intro-meta intro-count"></span>
      </div>
    </div>
  );
}
