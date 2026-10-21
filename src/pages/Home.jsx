import { Fragment } from "react";
import { Link } from "react-router-dom";
import Arrow from "../components/Arrow.jsx";
import OMark from "../components/OMark.jsx";
import Tagline from "../components/Tagline.jsx";
import Timecode from "../components/Timecode.jsx";
import Viewer from "../components/Viewer.jsx";
import { CONTACT } from "../site.js";

const MARQUEE = ["Brand films", "Storytelling", "Scripting", "Video production", "Live-action shoots", "AI visuals", "Editing", "Reels", "Shorts", "Campaigns"];

const STEPS = [
  { no: "01", title: "Story", text: "We dig into your brand, your audience and the one feeling the ad should leave behind.", items: ["Brand and audience research", "Concepts and hooks", "Moodboards"] },
  { no: "02", title: "Script", text: "Every second is written: the opening hook, the voiceover and a scene-by-scene shot list.", items: ["Scripts and voiceover", "Storyboards", "Hook variations"] },
  { no: "03", title: "Make", text: "We produce it the way the story needs: on set with a crew, with AI-driven visuals, or a mix of both. Every shot is directed.", items: ["Live-action shoots", "AI visuals and product shots", "Voice and music"] },
  { no: "04", title: "Edit", text: "Cut, colour, sound and captions, then shaped for every screen your audience watches.", items: ["Editing and motion graphics", "Sound design", "Platform-ready exports"] },
];

const WHY = [
  ["Reach", "Every ad is planned for where your audience already watches: Reels, Shorts, YouTube, OTT and TV."],
  ["Story", "We find the one idea that makes your brand worth remembering, and build everything around it."],
  ["Full production", "Live-action shoots, AI-driven visuals or both. We pick what serves the story and the budget, not a single method."],
  ["One team", "Writers, directors, producers and editors under one roof, so your story stays intact from brief to final cut."],
];

const PILLARS = [
  ["Visuals", "Frames worth stopping a scroll for, made with care down to the last second."],
  ["Ideas", "A clear story comes first. Every camera, tool and technique serves the idea."],
  ["Impact", "We judge an ad by how far it travels and what it does for your brand: reach, recall and sales."],
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

      <div className="marquee" aria-label={MARQUEE.join(", ")}>
        <div className="marquee-track" aria-hidden="true">
          {[0, 1].map((copy) =>
            MARQUEE.map((word) => (
              <Fragment key={`${copy}-${word}`}>
                <span>{word}</span><span aria-hidden="true">/</span>
              </Fragment>
            ))
          )}
        </div>
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
                <ul>{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="vstack" style={{ "--gap": "36px" }}>
            <p className="eyebrow">Why us</p>
            <p className="statement">A story only works if people see it. We make films built to travel: a clear hook, a story people remember, and a cut for every platform.</p>
            <Viewer motif="variants" tl="Takes 01–10" tr="16:9" bl="Selects" br="1 of 10" />
          </div>
          <div className="rows">
            {WHY.map(([h, p]) => (
              <div className="row" key={h}><h3>{h}</h3><p>{p}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section band-ink">
        <div className="wrap vstack" style={{ "--gap": "clamp(56px, 8vw, 88px)" }}>
          <p className="eyebrow">What we stand for</p>
          <div className="pillars">
            {PILLARS.map(([h, p]) => (
              <div className="pillar" key={h}><h3>{h}</h3><p className="muted">{p}</p></div>
            ))}
          </div>
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
