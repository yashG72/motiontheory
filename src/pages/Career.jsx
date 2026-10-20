import { useRef, useState } from "react";
import Arrow from "../components/Arrow.jsx";
import { CONTACT } from "../site.js";

// Open roles. Add another object to list a new position.
const JOBS = [
  {
    title: "AI Creative Director",
    location: "Work from home",
    type: "Full-time / Part-time",
    summary: "Lead the look and story of our ad films, from first idea to final frame.",
    points: [
      "Hands-on with AI video and image tools (Seedance 2.5, Runway, Kling, Veo, Midjourney, Higgsfield or similar)",
      "Strong prompt craft and an eye for consistent characters, products and lighting",
      "Understands storytelling, pacing and how an ad should feel",
      "Can take feedback and deliver on deadline",
    ],
  },
  {
    title: "Video Editor",
    location: "Work from home",
    type: "Full-time / Part-time",
    summary: "Cut, grade and finish ads, Reels and Shorts for real brands.",
    points: [
      "Strong editing and storytelling skills",
      "Proficiency in Premiere Pro, After Effects, DaVinci Resolve or similar",
      "Experience with Reels, Shorts and branded content",
      "Creative eye, attention to detail and ability to meet deadlines",
    ],
  },
];

const EMPLOYMENT = ["Full-time", "Part-time"];
const EXPERIENCE = ["Fresher", "Less than 1 year", "1 – 3 years", "3 – 5 years", "5+ years"];
const FORM_NAME = "career";
const MAX_FILE_MB = 8; // Netlify Forms upload limit

export default function Career() {
  const formRef = useRef(null);
  const sentRef = useRef(null);
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const applyFor = (title) => {
    setRole(title);
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    setError("");
    if (!form.checkValidity()) {
      const bad = form.querySelector(":invalid");
      const label = bad?.closest("fieldset")?.querySelector("legend") || bad?.labels?.[0];
      setError(`Please fill in ${label?.textContent.toLowerCase() || "the required fields"}.`);
      bad?.focus();
      return;
    }
    const resume = form.elements.resume.files[0];
    if (resume && resume.size > MAX_FILE_MB * 1024 * 1024) {
      setError(`Your resume is over ${MAX_FILE_MB} MB. Please upload a smaller file or share a link in your portfolio.`);
      return;
    }

    setSending(true);
    try {
      // Netlify Forms picks this up; the matching static form lives in index.html
      const r = await fetch("/", { method: "POST", body: new FormData(form) });
      if (!r.ok) throw new Error(r.statusText);
      setSent(true);
      requestAnimationFrame(() => sentRef.current?.focus());
    } catch {
      setError(`Something went wrong sending your application. Please try again, or email it to ${CONTACT.careerEmail}.`);
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    formRef.current?.reset();
    setRole("");
    setSent(false);
  };

  return (
    <>
      <section className="wrap page-head">
        <p className="eyebrow">Careers at MotionTheory</p>
        <h1 className="display display-l">Make ads people remember.</h1>
        <p className="lead">We are a small, remote team building ads for brands. If you love telling stories with video, we would like to see your work.</p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap vstack" style={{ "--gap": "28px" }}>
          <p className="eyebrow">Open roles</p>
          <div className="jobs">
            {JOBS.map((job) => (
              <article className="job" key={job.title}>
                <div className="job-head">
                  <h2 className="job-title">{job.title}</h2>
                  <ul className="job-tags">
                    <li>{job.location}</li>
                    <li>{job.type}</li>
                  </ul>
                </div>
                <p className="job-summary">{job.summary}</p>
                <ul className="job-points">{job.points.map((p) => <li key={p}>{p}</li>)}</ul>
                <div><button className="btn" type="button" onClick={() => applyFor(job.title)}>Apply <Arrow /></button></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section band-soft" id="apply" style={{ scrollMarginTop: 80 }}>
        <div className="wrap contact-grid">
          <div className="vstack" style={{ "--gap": "20px" }}>
            <p className="eyebrow">Apply</p>
            <h2 className="h-section">Show us how you work.</h2>
            <p className="muted">Fill in the form and share your best work. We read every application and reply to shortlisted candidates within a week.</p>
          </div>

          <div>
            <form
              className="form"
              ref={formRef}
              name={FORM_NAME}
              method="POST"
              encType="multipart/form-data"
              data-netlify="true"
              netlify-honeypot="company-website"
              onSubmit={onSubmit}
              noValidate
              hidden={sent}
            >
              <input type="hidden" name="form-name" value={FORM_NAME} />
              <p className="sr" aria-hidden="true">
                <label>Leave this empty <input name="company-website" tabIndex={-1} autoComplete="off" /></label>
              </p>

              <fieldset className="field">
                <legend>Role</legend>
                <div className="chips">
                  {JOBS.map((j) => (
                    <label className="chip" key={j.title}>
                      <input type="radio" name="role" value={j.title} required checked={role === j.title} onChange={() => setRole(j.title)} />
                      <span>{j.title}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset className="field">
                <legend>Employment type</legend>
                <div className="chips">
                  {EMPLOYMENT.map((t) => (
                    <label className="chip" key={t}>
                      <input type="radio" name="employment" value={t} required />
                      <span>{t}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="form-row">
                <div className="field"><label htmlFor="c-name">Full name</label><input id="c-name" name="name" type="text" autoComplete="name" required placeholder="Your name" /></div>
                <div className="field"><label htmlFor="c-email">Email</label><input id="c-email" name="email" type="email" autoComplete="email" required placeholder="you@email.com" /></div>
              </div>
              <div className="form-row">
                <div className="field"><label htmlFor="c-phone">Phone</label><input id="c-phone" name="phone" type="tel" autoComplete="tel" required placeholder="+91" /></div>
                <div className="field"><label htmlFor="c-city">City</label><input id="c-city" name="city" type="text" autoComplete="address-level2" placeholder="Where you are based" /></div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="c-exp">Experience</label>
                  <select id="c-exp" name="experience" required defaultValue="">
                    <option value="" disabled>Select</option>
                    {EXPERIENCE.map((x) => <option key={x}>{x}</option>)}
                  </select>
                </div>
                <div className="field"><label htmlFor="c-tools">Tools you use</label><input id="c-tools" name="tools" type="text" placeholder="Premiere, Runway, Kling…" /></div>
              </div>
              <div className="field"><label htmlFor="c-portfolio">Portfolio link</label><input id="c-portfolio" name="portfolio" type="url" required placeholder="Drive, Behance, Instagram or YouTube" /></div>
              <div className="field">
                <label htmlFor="c-resume">Resume (PDF, up to {MAX_FILE_MB} MB)</label>
                <input id="c-resume" name="resume" type="file" accept=".pdf,.doc,.docx" />
              </div>
              <div className="field"><label htmlFor="c-about">Why MotionTheory?</label><textarea id="c-about" name="message" placeholder="Tell us a little about yourself and the work you are proudest of."></textarea></div>
              {error && <p className="form-error" role="alert">{error}</p>}
              <div><button className="btn btn-solid" type="submit" disabled={sending}>{sending ? "Sending…" : "Submit application"} <Arrow /></button></div>
            </form>

            {sent && (
              <div className="sent" ref={sentRef} tabIndex={-1}>
                <p className="eyebrow">Application</p>
                <h2 className="h-section">Thanks, we have your application.</h2>
                <p className="muted">We review every application and will reach out if your profile is a fit.</p>
                <div><button className="copy-btn" type="button" onClick={reset}>Submit another</button></div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
