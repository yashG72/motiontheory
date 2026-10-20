import CopyButton from "../components/CopyButton.jsx";
import Viewer from "../components/Viewer.jsx";
import { CONTACT } from "../site.js";

// Open roles. Add another object to list a new position.
const JOBS = [
  {
    title: "Video Editors",
    pay: "₹30,000",
    per: "/ Month",
    extra: "+ Incentives",
    type: "Full-time opportunity",
    requirements: [
      "Strong editing & storytelling skills",
      "Proficiency in Premiere Pro / After Effects or similar",
      "Experience with Reels, Shorts & branded content",
      "Creative eye, attention to detail, and ability to meet deadlines",
    ],
    benefits: [
      "Work on real brands",
      "Creative freedom",
      "Performance-based incentives",
      "Learn, experiment and grow with a young team",
    ],
  },
];

const HOW_TO_APPLY = [
  ["Portfolio", "A link to your best work: Drive, Behance, Instagram or YouTube. Reels, Shorts and branded edits are the most useful to us."],
  ["Resume", "A short CV with the tools you use and the brands or creators you have worked with."],
  ["Subject line", "Write “Video Editor – Your Name” so your application reaches the right people."],
];

const softRule = { borderTopColor: "#9c978e" };

function Job({ job }) {
  const email = CONTACT.careerEmail;
  return (
    <div className="poster vstack" style={{ "--gap": "clamp(32px, 5vw, 52px)" }}>
      <p className="eyebrow">Career at MotionTheory</p>

      <div className="poster-hero">
        <p className="were">WE’RE</p>
        <h1 className="hiring">HIRING</h1>
      </div>

      <hr className="rule" style={softRule} />

      <div className="vstack" style={{ "--gap": "18px" }}>
        <h2 className="role-title">{job.title}</h2>
        <div>
          <p className="pay"><span className="pay-amount">{job.pay}</span><span className="pay-unit">{job.per}</span></p>
          <p className="pay-plus">{job.extra}</p>
        </div>
      </div>

      <hr className="rule" style={softRule} />

      <div className="req-ben">
        <div>
          <h3 className="eyebrow">Requirements</h3>
          <ul>{job.requirements.map((r) => <li key={r}>{r}</li>)}</ul>
        </div>
        <div>
          <h3 className="eyebrow">Benefits</h3>
          <ul>{job.benefits.map((b) => <li key={b}>{b}</li>)}</ul>
        </div>
      </div>

      <div className="apply-box">
        <p className="eyebrow" style={{ letterSpacing: "0.34em" }}>Send your portfolio &amp; resume to</p>
        <a className="email-big" id="career-email" href={`mailto:${email}?subject=${encodeURIComponent(job.title.replace(/s$/, "") + " application")}`}>{email}</a>
        <div className="copy-row">
          <CopyButton value={email} targetId="career-email">Copy email</CopyButton>
        </div>
      </div>

      <div className="poster-foot">
        <span className="eyebrow">{job.type}</span>
        <span className="eyebrow">Motion Theory</span>
      </div>
    </div>
  );
}

export default function Career() {
  return (
    <>
      <section className="section-tight">
        <div className="wrap">
          {JOBS.map((job) => <Job job={job} key={job.title} />)}
        </div>
      </section>

      <section className="section band-soft">
        <div className="wrap split">
          <div className="vstack" style={{ "--gap": "20px" }}>
            <p className="eyebrow">How to apply</p>
            <h2 className="h-section">Show us how you cut.</h2>
            <Viewer small motif="frames" tl="Your reel" tr="9:16 · 16:9" bl="Sc. 01 · Portfolio" br="25 fps" />
          </div>
          <div className="rows">
            {HOW_TO_APPLY.map(([h, p]) => (
              <div className="row" key={h}><h3>{h}</h3><p>{p}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="vstack" style={{ "--gap": "28px" }}>
            <p className="eyebrow">Don’t see your role?</p>
            <Viewer small motif="waveform" tl="Open call" tr="Stereo" bl="Sc. 02 · Crew" br="48 kHz" />
          </div>
          <div className="stack">
            <p className="statement">We are always glad to meet writers, AI artists, motion designers and sound designers.</p>
            <p className="muted">Send your work to {CONTACT.careerEmail} and tell us what you would like to make with us.</p>
          </div>
        </div>
      </section>
    </>
  );
}
