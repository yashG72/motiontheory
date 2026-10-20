import { Link } from "react-router-dom";
import Arrow from "../components/Arrow.jsx";
import Viewer from "../components/Viewer.jsx";

export default function NotFound() {
  return (
    <section className="wrap page-head">
      <p className="eyebrow">404</p>
      <h1 className="display display-l">Cut from the final edit.</h1>
      <p className="lead">This page doesn't exist. Head back to the home page.</p>
      <div><Link className="btn btn-solid" to="/">Back to home <Arrow /></Link></div>
      <div style={{ maxWidth: 520 }}><Viewer motif="focus" tl="Take 404" tr="16:9" bl="Scene missing" br="25 fps" /></div>
    </section>
  );
}
