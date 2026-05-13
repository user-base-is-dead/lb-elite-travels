import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import "./App.css";

import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Loader from "./components/Loader/Loader.jsx";
import CustomCursor from "./components/CustomCursor/CustomCursor.jsx";
import ScrollProgress from "./components/ScrollProgress/ScrollProgress.jsx";
import SmoothScroll from "./components/SmoothScroll/SmoothScroll.jsx";

import Home from "./pages/Home/Home.jsx";

const Journey = lazy(() => import("./pages/Journey/Journey.jsx"));
const About = lazy(() => import("./pages/About/About.jsx"));
const Contact = lazy(() => import("./pages/Contact/Contact.jsx"));

function NotFound() {
  return (
    <section className="page" style={{ minHeight: "60vh", display: "grid", placeItems: "center", paddingTop: "8rem" }}>
      <div style={{ textAlign: "center" }}>
        <p className="label" style={{ color: "var(--color-sienna)" }}>404</p>
        <h1 style={{ fontSize: "var(--fs-h2)", marginTop: "1rem" }}>Off the map.</h1>
      </div>
    </section>
  );
}

export default function App() {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app grain">
      {loading && <Loader />}
      <CustomCursor />
      <ScrollProgress />
      <SmoothScroll>
        <Header />
        <main>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/journey" element={<Journey />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </SmoothScroll>
    </div>
  );
}
