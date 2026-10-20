import { useEffect, useState } from "react";

// Opening titles, played once per page load: the logo builds letter by letter
// on a dark frame, holds while the playhead runs, then the frame lifts away.
// index.html adds the "intro" class to <html> before anything paints; without
// it (reduced motion) this renders nothing.

const HOLD = 2400; // ms from start until the frame starts lifting
const LIFT = 1000; // ms for the lift-away

function Letters({ word, from }) {
  return word.split("").map((ch, i) => (
    <span className="intro-char" style={{ "--i": from + i }} key={i}>
      {ch === "Ø" ? <span className="o-mark intro-o"></span> : ch}
    </span>
  ));
}

export default function Intro() {
  const [phase, setPhase] = useState(() =>
    document.documentElement.classList.contains("intro") ? "in" : "done"
  );

  useEffect(() => {
    if (phase !== "in") return;
    const lift = () => setPhase("out");
    const t = setTimeout(lift, HOLD);
    // Any click or key skips straight to the lift
    window.addEventListener("pointerdown", lift);
    window.addEventListener("keydown", lift);
    return () => {
      clearTimeout(t);
      window.removeEventListener("pointerdown", lift);
      window.removeEventListener("keydown", lift);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "out") return;
    // Let the page's own entrance play as the frame lifts
    document.documentElement.classList.remove("intro");
    const t = setTimeout(() => setPhase("done"), LIFT);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div className={`intro-screen${phase === "out" ? " is-out" : ""}`} role="img" aria-label="MotionTheory">
      <div className="intro-grain" aria-hidden="true"></div>
      <div className="intro-logo" aria-hidden="true">
        <span className="intro-line"><Letters word="MØTION" from={0} /></span>
        <span className="intro-line"><Letters word="THEORY" from={3} /></span>
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
