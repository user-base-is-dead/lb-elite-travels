import { useRef } from "react";
import ContactForm from "./ContactComponents/ContactForm/ContactForm.jsx";
import ContactInfo from "./ContactComponents/ContactInfo/ContactInfo.jsx";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.js";
import "./Contact.css";

export default function Contact() {
  const ref = useRef(null);
  useScrollAnimation(ref);

  return (
    <div ref={ref} className="contact page">
      <section className="contact__hero">
        <div className="container">
          <p className="label contact__eyebrow">— Begin a journey</p>
          <h1 className="contact__title">Hello, traveller.</h1>
        </div>
      </section>

      <section className="contact__body">
        <div className="container contact__grid">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
