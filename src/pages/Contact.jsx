import { useRef, useState } from "react";
import Arrow from "../components/Arrow.jsx";
import CopyButton from "../components/CopyButton.jsx";
import OMark from "../components/OMark.jsx";
import Viewer from "../components/Viewer.jsx";
import { CONTACT, SOCIAL, FORM_ENDPOINT } from "../site.js";

const SERVICES = ["Storytelling", "Scripting", "AI video", "Editing", "Full campaign"];
const BUDGETS = ["Under ₹50,000", "₹50,000 – ₹1,50,000", "₹1,50,000 – ₹5,00,000", "Above ₹5,00,000", "Not sure yet"];

export default function Contact() {
  const formRef = useRef(null);
  const sentRef = useRef(null);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null); // { body, subject, posted }

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
    const data = new FormData(form);
    const services = data.getAll("service");
    const body = [
      `Name: ${data.get("name")}`,
      `Brand: ${data.get("brand") || "-"}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone") || "-"}`,
      `Looking for: ${services.length ? services.join(", ") : "-"}`,
      `Budget: ${data.get("budget") || "-"}`,
      "",
      data.get("message"),
    ].join("\n");
    const subject = `New brief from ${data.get("brand") || data.get("name")}`;

    let posted = false;
    if (FORM_ENDPOINT) {
      try {
        const r = await fetch(FORM_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
        posted = r.ok;
      } catch {
        posted = false;
      }
    }
    setResult({ body, subject, posted });
    requestAnimationFrame(() => sentRef.current?.focus());
  };

  const reset = () => {
    formRef.current?.reset();
    setResult(null);
  };

  const to = CONTACT.projectsEmail;

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
            <div><dt>Phone</dt><dd>{CONTACT.phone
              ? <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>{CONTACT.phone}</a>
              : <span className="placeholder">Phone number to be added</span>}</dd></div>
            <div><dt>Studio</dt><dd>{CONTACT.studio || <span className="placeholder">City, India (address to be added)</span>}</dd></div>
            <div><dt>Follow</dt><dd>
              {SOCIAL.map((s, i) => (
                <span key={s.name}>{i > 0 && <>&nbsp;·&nbsp; </>}<a href={s.url} target="_blank" rel="noopener noreferrer">{s.name}</a></span>
              ))}
            </dd></div>
          </dl>

          <div>
            <form className="form" ref={formRef} onSubmit={onSubmit} noValidate hidden={!!result}>
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
              <div><button className="btn btn-solid" type="submit">Send brief <Arrow /></button></div>
            </form>

            {result && (
              <div className="sent" ref={sentRef} tabIndex={-1}>
                <p className="eyebrow">Brief</p>
                <h2 className="h-section">{result.posted ? "Thanks, we have your brief." : "Your brief is ready."}</h2>
                <p className="muted">{result.posted ? "We read every brief and reply personally." : `Send it to ${to} and we will get back to you.`}</p>
                <pre id="brief-summary">{result.body}</pre>
                <div className="copy-row" style={{ justifyContent: "flex-start", alignItems: "center", gap: 20 }}>
                  {!result.posted && (
                    <a className="btn btn-solid" href={`mailto:${to}?subject=${encodeURIComponent(result.subject)}&body=${encodeURIComponent(result.body)}`}>Open in email <Arrow /></a>
                  )}
                  <CopyButton value={result.body} targetId="brief-summary">Copy brief</CopyButton>
                  <button className="copy-btn" type="button" onClick={reset}>Write another</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
