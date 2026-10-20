import { Fragment } from "react";
import { Link } from "react-router-dom";
import Arrow from "../components/Arrow.jsx";
import OMark from "../components/OMark.jsx";
import Tagline from "../components/Tagline.jsx";
import Timecode from "../components/Timecode.jsx";
import Viewer from "../components/Viewer.jsx";
import { CONTACT } from "../site.js";

const MARQUEE = ["Storytelling", "Scripting", "AI video", "Editing", "Sound", "Reels", "Shorts", "Launch films"];

const STEPS = [
  { no: "01", title: "Story", text: "We dig into your brand, your audience and the one feeling the ad should leave behind.", items: ["Brand and audience research", "Concepts and hooks", "Moodboards"] },
  { no: "02", title: "Script", text: "Every second is written: the opening hook, the voiceover and a scene-by-scene shot list.", items: ["Scripts and voiceover", "Storyboards", "Hook variations"] },
  { no: "03", title: "Make", text: "We direct the visuals with AI: characters, products and whole worlds that would otherwise need a full shoot.", items: ["AI video and imagery", "Product shots", "Voice and music"] },
  { no: "04", title: "Edit", text: "Cut, colour, sound and captions, then exported for every platform you run on.", items: ["Editing and motion graphics", "Sound design", "Platform-ready exports"] },
];

const WHY = [
  ["Speed", "Concepts, scripts and first cuts move in days. Changes don't mean booking a new shoot."],
  ["Range", "Try different hooks, settings and characters for the same product, then keep what performs."],
  ["Budget", "Studio-level visuals without paying for locations, sets and a full crew."],
  ["Craft", "AI does the heavy lifting. People make the calls: every frame is directed, reviewed and edited by our team."],
];

const PILLARS = [
  ["Visuals", "Frames worth stopping a scroll for, made with care down to the last second."],
  ["Ideas", "A clear story comes first. The technology serves the idea, never the other way round."],
  ["Impact", "We judge an ad by what it does for your brand: attention, recall and sales."],
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
            <span className="line"><span>AI ads that</span></span>
            <span className="line"><span><span className="nowrap">m<OMark />ve</span> people.</span></span>
          </h1>

          <div className="hero-grid">
            <div>
              <p className="lead">MotionTheory makes AI-powered ads for brands. We handle everything in between your idea and the final cut: the story, the script, the visuals and the edit.</p>
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
            <div className="vstack" style={{ "--gap": "20px" }}>
              <p className="eyebrow">What we do</p>
              <h2 className="h-section">From first idea to final cut, under one roof.</h2>
            </div>
            <p className="muted">Most brands juggle a writer, a production house and an editor. We are all three. AI tools let us move faster and try more ideas before we commit to one.</p>
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
          <div className="vstack" style={{ "--gap": "28px" }}>
            <p className="eyebrow">Why AI</p>
            <p className="statement">We can test ten ideas in the time a shoot takes to plan one. You see more options, and the strongest one goes live.</p>
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
        <div className="wrap vstack" style={{ "--gap": "clamp(40px, 6vw, 64px)" }}>
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
            <h2 className="display display-m">Have a brand with a story to tell?</h2>
            <a className="email-big" href={`mailto:${CONTACT.projectsEmail}`}>{CONTACT.projectsEmail}</a>
            <div><Link className="btn btn-solid" to="/contact">Send us a brief <Arrow /></Link></div>
          </div>
          <Viewer motif="slate" tl="Next take" tr="Your brand" bl="Sc. 01 · Brief" br="Rec" />
        </div>
      </section>
    </>
  );
}
