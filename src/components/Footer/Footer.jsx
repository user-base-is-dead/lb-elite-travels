import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="label footer__eyebrow">Plan your journey</p>
        <Link to="/contact" className="footer__cta-link">
          <h2 className="footer__cta">Let&rsquo;s travel.</h2>
        </Link>

        <div className="footer__grid">
          <div>
            <p className="label footer__heading">Studio</p>
            <p className="footer__title">LB Elite Travels</p>
            <p className="footer__small">Curated journeys across India</p>
          </div>
          <div>
            <p className="label footer__heading">Visit</p>
            <p className="footer__small">Bengaluru</p>
            <p className="footer__small">Karnataka, India</p>
          </div>
          <div>
            <p className="label footer__heading">Contact</p>
            <p className="footer__small">support@lbelitetravels.com</p>
            <p className="footer__small">(+91) 97400 04573</p>
          </div>
          <div>
            <p className="label footer__heading">Follow</p>
            <ul className="footer__list">
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Journal</a></li>
              <li><a href="#">Pinterest</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} LB Elite Travels — India only, always.</p>
          <p className="label">Made with care in Bengaluru</p>
        </div>
      </div>
    </footer>
  );
}
