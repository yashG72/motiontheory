import { Link } from "react-router-dom";
import { asset } from "../asset.js";
import Tagline from "./Tagline.jsx";
import { CONTACT, SOCIAL } from "../site.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <img src={asset("images/wordmark-light.png")} alt="MotionTheory" width="300" height="103" />
            <Tagline />
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About us</Link></li>
              <li><Link to="/career">Career</Link></li>
              <li><Link to="/contact">Contact us</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Write to us</h4>
            <ul>
              <li><a href={`mailto:${CONTACT.projectsEmail}`}>{CONTACT.projectsEmail}</a></li>
              <li><a href={`mailto:${CONTACT.careerEmail}`}>{CONTACT.careerEmail}</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Follow</h4>
            <ul>
              {SOCIAL.map((s) => (
                <li key={s.name}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.name}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} MotionTheory</span>
          <span>motiontheory.media</span>
        </div>
      </div>
    </footer>
  );
}
