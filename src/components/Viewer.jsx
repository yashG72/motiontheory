// A camera viewfinder frame: rule-of-thirds grid, corner readouts, a timeline
// tick, and a small animated scene ("motif") in the middle.

const range = (n) => Array.from({ length: n }, (_, i) => i);

const MOTIFS = {
  // The logo's O with a line: a playhead scrubbing
  circle: () => <div className="viewer-circle"></div>,

  // Focus brackets and a crosshair, breathing in and out
  focus: () => (
    <div className="m-focus">
      <span></span><span></span><span></span><span></span>
      <i></i>
    </div>
  ),

  // Script lines writing themselves, with a caret
  script: () => (
    <div className="m-script">
      <b>INT. STUDIO – DAY</b>
      {range(5).map((i) => <span key={i} style={{ "--i": i }}></span>)}
    </div>
  ),

  // Three storyboard panels, one active at a time
  storyboard: () => (
    <div className="m-board">
      {range(3).map((i) => (
        <span key={i} style={{ "--i": i }}><i></i></span>
      ))}
    </div>
  ),

  // An edit timeline: clips on three tracks and a moving playhead
  timeline: () => (
    <div className="m-timeline">
      <div className="m-track"><span style={{ left: "0%", width: "28%" }}></span><span style={{ left: "30%", width: "40%" }}></span><span style={{ left: "72%", width: "26%" }}></span></div>
      <div className="m-track"><span style={{ left: "10%", width: "22%" }}></span><span style={{ left: "46%", width: "18%" }}></span></div>
      <div className="m-track m-audio"><span style={{ left: "0%", width: "98%" }}></span></div>
      <i></i>
    </div>
  ),

  // Ten small frames, one lit at a time: ten ideas, one winner
  variants: () => (
    <div className="m-variants">
      {range(10).map((i) => <span key={i} style={{ "--i": i }}></span>)}
    </div>
  ),

  // An audio waveform
  waveform: () => (
    <div className="m-wave">
      {range(28).map((i) => (
        <span key={i} style={{ "--i": i, "--h": `${30 + ((i * 37) % 70)}%` }}></span>
      ))}
    </div>
  ),

  // Nested 16:9, 1:1 and 9:16 safe areas
  frames: () => (
    <div className="m-frames">
      <span className="r169"></span><span className="r11"></span><span className="r916"></span>
    </div>
  ),

  // A clapperboard snapping shut
  slate: () => (
    <div className="m-slate">
      <div className="m-slate-arm"></div>
      <div className="m-slate-bar"></div>
      <div className="m-slate-body">
        <span>MOTION THEORY</span>
        <span>SC. 01 &nbsp; TAKE 01</span>
      </div>
    </div>
  ),
};

export default function Viewer({ motif = "circle", tl, tr, bl, br, ratio, dark = false, small = false }) {
  const Motif = MOTIFS[motif] || MOTIFS.circle;
  const cls = ["viewer", dark && "viewer-dark", small && "viewer-sm"].filter(Boolean).join(" ");
  return (
    <div className={cls} style={ratio ? { aspectRatio: ratio } : undefined} aria-hidden="true">
      {tl && <span className="viewer-label tl">{tl}</span>}
      {tr && <span className="viewer-label tr">{tr}</span>}
      <Motif />
      <div className="viewer-track"></div>
      {bl && <span className="viewer-label bl">{bl}</span>}
      {br && <span className="viewer-label br">{br}</span>}
    </div>
  );
}
