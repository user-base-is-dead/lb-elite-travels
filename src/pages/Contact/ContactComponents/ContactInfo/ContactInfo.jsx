import "./ContactInfo.css";

export default function ContactInfo() {
  const items = [
    { label: "Email", value: "support@lbelitetravels.com" },
    { label: "Phone · Whatsapp", value: "(+91) 97400 04573" },
    { label: "Location", value: "Bengaluru\nKarnataka, India" },
    { label: "Hours", value: "Mon — Sat · 10:00 — 19:00 IST", small: true },
  ];
  return (
    <aside className="cinfo">
      {items.map((it) => (
        <div key={it.label} className="cinfo__block fade-up">
          <p className="label cinfo__label">{it.label}</p>
          <p className={it.small ? "cinfo__small" : "cinfo__value"}>{it.value}</p>
        </div>
      ))}
    </aside>
  );
}
