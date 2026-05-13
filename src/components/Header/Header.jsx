import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      window.dispatchEvent(new Event("lenis:stop"));
      return () => {
        document.body.style.overflow = prev;
        window.dispatchEvent(new Event("lenis:start"));
      };
    }
  }, [open]);

  const navCls = ({ isActive }) => `header__link ${isActive ? "is-active" : ""}`;

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header__inner container">
        <div className="header__left">
          <Link to="/" className="header__brand" onClick={() => setOpen(false)}>
            <span className="header__brand-mark">LB</span>
            <span className="header__brand-name label">Elite Travels</span>
          </Link>
        </div>

        <nav className={`header__nav ${open ? "is-open" : ""}`}>
          <NavLink to="/" end className={navCls} onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/journey" className={navCls} onClick={() => setOpen(false)}>Journey</NavLink>
          <NavLink to="/about" className={navCls} onClick={() => setOpen(false)}>About</NavLink>
          <NavLink to="/contact" className={navCls} onClick={() => setOpen(false)}>Contact</NavLink>
          <a href="tel:+919740004573" className="header__link" onClick={() => setOpen(false)}>Call</a>
        </nav>

        <Link to="/contact" className="header__cta label">
          Plan a journey <span aria-hidden>→</span>
        </Link>

        <button
          className={`header__burger ${open ? "is-open" : ""}`}
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
