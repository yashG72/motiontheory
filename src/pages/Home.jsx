import { Link } from "react-router-dom";
import Arrow from "../components/Arrow.jsx";
import OMark from "../components/OMark.jsx";
import Tagline from "../components/Tagline.jsx";
import Timecode from "../components/Timecode.jsx";
import Viewer from "../components/Viewer.jsx";
import { CONTACT } from "../site.js";

const STEPS = [
  { no: "01", title: "Story", text: "We dig into your brand, your audience and the one feeling the ad should leave behind." },
  { no: "02", title: "Script", text: "Every second is written: the opening hook, the voiceover and a scene-by-scene shot list." },
  { no: "03", title: "Make", text: "We produce it the way the story needs: on set with a crew, with AI-driven visuals, or a mix of both. Every shot is directed." },
  { no: "04", title: "Edit", text: "Cut, colour, sound and captions, then shaped for every screen your audience watches." },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="hero-top">
            <Tagline />
            <Timecode />
          </div>

          <h1 className="display hero-title" style={{ fontSize: "clamp(2.9rem, 10.5vw, 9.2rem)" }}>
            <span className="line"><span>Visuals that</span></span>
            <span className="line"><span><span className="nowrap">m<OMark />ve</span> people.</span></span>
          </h1>

          <div className="hero-grid">
            <div>
              <p className="lead">MotionTheory is a storytelling and video production studio. We help brands take their story to the masses, handling everything from the first idea to the final cut: the story, the script, the production and the edit.</p>
              <div className="hero-actions">
                <Link className="btn btn-solid" to="/contact">Start a project <Arrow /></Link>
                <a className="btn" href="#how">How we work</a>
              </div>
            </div>
            <Viewer motif="circle" tl="Take 01" tr="16:9" bl="Sc. 01 · Story" br="25 fps" />
          </div>
        </div>
      </section>

      <div className="scrub" aria-hidden="true">
        <div className="scrub-ticks"></div>
        <div className="scrub-head"></div>
      </div>

      <section className="section" id="how">
        <div className="wrap">
          <div className="section-head">
            <div className="vstack" style={{ "--gap": "28px" }}>
              <p className="eyebrow">What we do</p>
              <h2 className="h-section">From your story to millions of screens.</h2>
            </div>
            <p className="muted">Most brands juggle a writer, a production house and an editor. We are all three, and we plan every film around who it needs to reach and where it will run.</p>
          </div>

          <ol className="process" role="list" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {STEPS.map((s) => (
              <li className="step" key={s.no}>
                <span className="step-no">{s.no}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section cta">
        <div className="wrap cta-grid">
          <div className="cta-inner">
            <p className="eyebrow">Start a project</p>
            <h2 className="display display-m">Have a story the world should hear?</h2>
            <a className="email-big" href={`mailto:${CONTACT.projectsEmail}`}>{CONTACT.projectsEmail}</a>
            <div><Link className="btn btn-solid" to="/contact">Send us a brief <Arrow /></Link></div>
          </div>
          <Viewer motif="slate" tl="Next take" tr="Your brand" bl="Sc. 01 · Brief" br="Rec" />
        </div>
      </section>
    </>
  );
}
