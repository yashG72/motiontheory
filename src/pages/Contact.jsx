import { useRef, useState } from "react";
import Arrow from "../components/Arrow.jsx";
import OMark from "../components/OMark.jsx";
import Viewer from "../components/Viewer.jsx";
import { CONTACT } from "../site.js";

const SERVICES = ["Storytelling", "Scripting", "AI video", "Editing", "Full campaign"];
const BUDGETS = ["Under ₹50,000", "₹50,000 – ₹1,50,000", "₹1,50,000 – ₹5,00,000", "Above ₹5,00,000", "Not sure yet"];

const FORM_NAME = "contact";

export default function Contact() {
  const formRef = useRef(null);
  const sentRef = useRef(null);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const to = CONTACT.projectsEmail;

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    setError("");
    if (!form.checkValidity()) {
      const bad = form.querySelector(":invalid");
      const name = bad?.labels?.[0]?.textContent.toLowerCase() || "the required fields";
      setError(`Please fill in ${name} so we can get back to you.`);
      bad?.focus();
      return;
    }

    setSending(true);
    try {
      // Netlify Forms picks this up; the matching static form lives in index.html
      const body = new URLSearchParams(new FormData(form)).toString();
      const r = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body });
      if (!r.ok) throw new Error(r.statusText);
      setSent(true);
      requestAnimationFrame(() => sentRef.current?.focus());
    } catch {
      setError(`Something went wrong sending your brief. Please try again, or email us at ${to}.`);
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    formRef.current?.reset();
    setSent(false);
  };

  return (
    <>
      <section className="wrap page-head page-head-split">
        <div className="vstack" style={{ "--gap": "clamp(24px, 4vw, 40px)" }}>
        <p className="eyebrow">Contact us</p>
        <h1 className="display display-l">Let’s make something that <span className="nowrap">m<OMark />ves.</span></h1>
        <p className="lead">Tell us about your brand and the ad you have in mind. A rough idea is enough to start.</p>
        </div>
        <Viewer motif="waveform" tl="Rec · Audio" tr="Stereo" bl="Sc. 01 · Hello" br="48 kHz" />
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap contact-grid">
          <dl className="info-list">
            <div><dt>New projects</dt><dd><a href={`mailto:${to}`}>{to}</a></dd></div>
            <div><dt>Careers</dt><dd><a href={`mailto:${CONTACT.careerEmail}`}>{CONTACT.careerEmail}</a></dd></div>
          </dl>

          <div>
            <form
              className="form"
              ref={formRef}
              name={FORM_NAME}
              method="POST"
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
              <div className="form-row">
                <div className="field"><label htmlFor="f-name">Your name</label><input id="f-name" name="name" type="text" autoComplete="name" required placeholder="Full name" /></div>
                <div className="field"><label htmlFor="f-brand">Brand</label><input id="f-brand" name="brand" type="text" autoComplete="organization" placeholder="Company or brand" /></div>
              </div>
              <div className="form-row">
                <div className="field"><label htmlFor="f-email">Email</label><input id="f-email" name="email" type="email" autoComplete="email" required placeholder="you@brand.com" /></div>
                <div className="field"><label htmlFor="f-phone">Phone</label><input id="f-phone" name="phone" type="tel" autoComplete="tel" placeholder="+91" /></div>
              </div>
              <fieldset className="field">
                <legend>What do you need?</legend>
                <div className="chips">
                  {SERVICES.map((s) => (
                    <label className="chip" key={s}>
                      <input type="checkbox" id={`s-${s.toLowerCase().replace(/\s/g, "-")}`} name="service" value={s} />
                      <span>{s}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="field">
                <label htmlFor="f-budget">Budget</label>
                <select id="f-budget" name="budget" defaultValue="">
                  <option value="">Select a range</option>
                  {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div className="field"><label htmlFor="f-message">Your idea</label><textarea id="f-message" name="message" required placeholder="What are you launching, who is it for, and where will the ad run?"></textarea></div>
              {error && <p className="form-error" role="alert">{error}</p>}
              <div><button className="btn btn-solid" type="submit" disabled={sending}>{sending ? "Sending…" : "Send brief"} <Arrow /></button></div>
            </form>

            {sent && (
              <div className="sent" ref={sentRef} tabIndex={-1}>
                <p className="eyebrow">Brief</p>
                <h2 className="h-section">Thanks, we have your brief.</h2>
                <p className="muted">We read every brief and reply personally, usually within a working day.</p>
                <div><button className="copy-btn" type="button" onClick={reset}>Write another</button></div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
