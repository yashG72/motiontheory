import { Link } from "react-router-dom";
import Arrow from "../components/Arrow.jsx";
import Viewer from "../components/Viewer.jsx";

const PILLARS = [
  ["Visuals", "Every frame is composed. Light, colour, type and pace are chosen on purpose, never left to chance or to a default setting."],
  ["Ideas", "We write the story before we make a single image. If the idea doesn't hold up on paper, it won't hold up on screen."],
  ["Impact", "An ad exists to move people. We measure our work by what it does for your brand."],
];

const PROCESS = [
  ["01", "Brief", "We learn your brand, your product, your audience and what the ad needs to achieve."],
  ["02", "Story and script", "We pitch concepts, then write the chosen one into a full script and storyboard for your approval."],
  ["03", "Production", "We shoot, create and record what the script needs: live-action, AI-driven visuals, voice and music, directed shot by shot."],
  ["04", "Edit and review", "We cut, colour and sound-design the ad, then refine it with your feedback."],
  ["05", "Delivery", "You receive final files in every format and length your platforms need, ready to reach your audience."],
];

export default function About() {
  return (
    <>
      <section className="wrap page-head page-head-split">
        <div className="vstack" style={{ "--gap": "clamp(32px, 5vw, 56px)" }}>
        <p className="eyebrow">About us</p>
        <h1 className="display display-l">Story first.<br />Always.</h1>
        <p className="lead">MotionTheory is a storytelling and video production studio for brands. We help you find the story only your brand can tell, then produce it into films that reach the masses.</p>
        </div>
        <Viewer motif="script" tl="Take 01" tr="16:9" bl="Sc. 00 · Our story" br="24 fps" />
      </section>

      <div className="wrap"><hr className="rule rule-ink" /></div>

      <section className="section">
        <div className="wrap split split-center">
          <p className="eyebrow">Our story</p>
          <div className="stack">
            <p className="statement">We started MotionTheory because great brands often have great stories that never reach the people they are meant for.</p>
            <p className="muted">A story needs more than a good idea. It needs a sharp script, the right production, a careful edit and a format made for where people actually watch. We put storytellers, scriptwriters, directors, editors and visual artists in one room, so your idea never gets lost between agencies.</p>
            <p className="muted">Today we make brand films across social, web and TV: Reels and Shorts that stop the scroll, product films, launch videos and full campaigns, shot live, made with AI, or both.</p>
          </div>
        </div>
      </section>

      <section className="section band-soft">
        <div className="wrap vstack" style={{ "--gap": "clamp(56px, 8vw, 88px)" }}>
          <div className="section-head" style={{ marginBottom: 0 }}>
            <p className="eyebrow">The name on the logo</p>
            <p className="muted">Our tagline is how we check every piece of work before it leaves the studio.</p>
          </div>
          <div className="pillars">
            {PILLARS.map(([h, p]) => (
              <div className="pillar" key={h}><h3>{h}</h3><p className="muted">{p}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="split">
          <div className="vstack" style={{ "--gap": "32px" }}>
            <p className="eyebrow">How we work</p>
            <h2 className="h-section">One team, one brief, start to finish.</h2>
            <p className="muted">You get a single point of contact who stays with your project from the first call to the final export.</p>
            <Viewer small motif="timeline" tl="Edit 01" tr="16:9" bl="Brief → Delivery" br="25 fps" />
          </div>
          <div className="rows">
            {PROCESS.map(([no, h, p]) => (
              <div className="row" key={no}><h3>{no}&nbsp; {h}</h3><p>{p}</p></div>
            ))}
          </div>
          </div>
        </div>
      </section>

      <section className="section band-ink">
        <div className="wrap split split-center">
          <div className="vstack" style={{ "--gap": "36px" }}>
            <p className="eyebrow">The team</p>
          </div>
          <div className="stack">
            <p className="statement">A young team of storytellers, filmmakers, editors and visual artists who love ads that people actually want to watch.</p>
            <p className="muted">We are growing. If that sounds like you, we would like to hear from you.</p>
            <div><Link className="btn" to="/career">See open roles <Arrow /></Link></div>
          </div>
        </div>
      </section>

      <section className="section cta">
        <div className="wrap cta-inner">
          <p className="eyebrow">Work with us</p>
          <h2 className="display display-m">Let's tell your brand's story.</h2>
          <div><Link className="btn btn-solid" to="/contact">Start a project <Arrow /></Link></div>
        </div>
      </section>
    </>
  );
}
