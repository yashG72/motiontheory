import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { asset } from "../asset.js";
import Arrow from "./Arrow.jsx";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About us" },
  { to: "/career", label: "Career" },
  { to: "/contact", label: "Contact us" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation and on Escape
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}${open ? " menu-open" : ""}`}>
      <div className="wrap nav">
        <Link className="brand" to="/" aria-label="MotionTheory home">
          <img src={asset("images/wordmark.png")} alt="MotionTheory" width="128" height="44" />
        </Link>
        <nav aria-label="Main">
          <ul className="nav-links" id="nav-links">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Link className="btn" to="/contact">Start a project <Arrow /></Link>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="nav-links"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span></span><span></span>
        </button>
      </div>
    </header>
  );
}
