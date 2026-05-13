import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { destinations } from "../../../../data/destinations.js";
import "./ContactForm.css";

export default function ContactForm() {
  const [params] = useSearchParams();
  const preset = params.get("tour") || "";
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    tour: preset,
    travelers: "2",
    when: "",
    notes: "",
  });

  useEffect(() => {
    if (preset) setForm((f) => ({ ...f, tour: preset }));
  }, [preset]);

  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="cform">
        <p className="label cform__eyebrow">— Sent</p>
        <h2 className="cform__thanks">
          Thank you, <em className="italic" style={{ color: "var(--color-copper)" }}>{form.name || "traveller"}</em>.
        </h2>
        <p className="cform__after">
          We&rsquo;ll be in touch within one working day with a draft itinerary
          and a few questions to make it truly yours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="cform">
      <Field label="Your name" required>
        <input className="cform__input" required value={form.name} onChange={onChange("name")} />
      </Field>
      <Field label="Email" required>
        <input type="email" className="cform__input" required value={form.email} onChange={onChange("email")} />
      </Field>
      <div className="cform__row">
        <Field label="Which journey?">
          <select className="cform__input" value={form.tour} onChange={onChange("tour")}>
            <option value="">Not sure yet</option>
            {destinations.map((t) => (
              <option key={t.slug} value={t.slug}>{t.title}</option>
            ))}
          </select>
        </Field>
        <Field label="Travellers">
          <input className="cform__input" value={form.travelers} onChange={onChange("travelers")} />
        </Field>
      </div>
      <Field label="When">
        <input
          className="cform__input"
          placeholder="e.g. October 2026, two weeks"
          value={form.when}
          onChange={onChange("when")}
        />
      </Field>
      <Field label="Tell us anything">
        <textarea rows={5} className="cform__input cform__textarea" value={form.notes} onChange={onChange("notes")} />
      </Field>
      <div className="cform__submit">
        <button type="submit" className="cform__btn label">
          Send enquiry <span aria-hidden>→</span>
        </button>
      </div>
    </form>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="cform__field">
      <span className="label cform__label">
        {label}{required && <span style={{ color: "var(--color-sienna)" }}> *</span>}
      </span>
      {children}
    </label>
  );
}
