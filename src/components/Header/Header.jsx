import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import gsap from "gsap";
import "./Header.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "";
    setOpen(false);
    window.dispatchEvent(new Event("lenis:start"));
  }, [pathname]);

  useEffect(() => {
    if (window.innerWidth > 899) return;

    const links = navRef.current?.querySelectorAll(".header__link");
    if (!links) return;

    if (open) {
      document.body.style.overflow = "hidden";
      window.dispatchEvent(new Event("lenis:stop"));
      gsap.fromTo(links,
        { opacity: 0, y: 28, skewY: 2 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.55, stagger: 0.08, ease: "power3.out", delay: 0.15 }
      );
    } else {
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("lenis:start"));
      gsap.to(links, { opacity: 0, y: -12, duration: 0.25, stagger: 0.04, ease: "power2.in" });
    }
  }, [open]);

  const navCls = ({ isActive }) => `header__link ${isActive ? "is-active" : ""}`;

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""} ${!isHome ? "is-subpage" : ""}`}>
      <div className="header__inner container">
        <div className="header__left">
          <Link to="/" className="header__brand" onClick={() => setOpen(false)}>
            <span className="header__brand-mark">LB</span>
            <span className="header__brand-name label">Elite Travels</span>
          </Link>
        </div>

        <nav ref={navRef} className={`header__nav ${open ? "is-open" : ""}`}>
          <NavLink to="/" end className={navCls} onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/journey" className={navCls} onClick={() => setOpen(false)}>Journey</NavLink>
          <NavLink to="/about" className={navCls} onClick={() => setOpen(false)}>About</NavLink>
          <NavLink to="/contact" className={navCls} onClick={() => setOpen(false)}>Contact</NavLink>
          <a href="tel:+919740004573" className="header__link" onClick={() => setOpen(false)}>Call</a>
        </nav>

        <Link to="/contact" className="header__cta label">
          <span>Plan a journey</span>
          <span className="header__cta-arrow" aria-hidden>→</span>
        </Link>

        <button
          className={`header__burger ${open ? "is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
