import { useRef } from "react";
import { useScrollAnimation } from "../../../../hooks/useScrollAnimation.js";
import "./OurStory.css";

export default function OurStory() {
  const ref = useRef(null);
  useScrollAnimation(ref);

  return (
    <section ref={ref} className="story">
      <div className="container story__inner">
        <div className="story__visual">
          <img src="/images/journey-varanasi.jpg" alt="Sadhu at the ghats of Varanasi" loading="lazy" />
        </div>
        <div className="story__copy">
          <p className="label story__eyebrow fade-up">— Our story</p>
          <p className="story__lede fade-up">
            We started LB Elite Travels in a one-room office in Hauz Khas with a single,
            slightly stubborn idea — that India deserves more than two weeks and a checklist.
          </p>
          <p className="story__p fade-up">
            Eleven years later we&rsquo;re still here. Same idea. A few more people. We don&rsquo;t
            sell packages. We sit down, we listen, we draw a map. Sometimes that map runs eight
            days through Rajasthan; sometimes it&rsquo;s three weeks crossing four seasons in the
            Himalayas. It&rsquo;s always built around you.
          </p>
          <p className="story__p fade-up">
            Every guide we work with is local to their region. Every hotel is one we&rsquo;ve
            slept in. Every restaurant we recommend, we&rsquo;ve eaten in twice — once for the
            food, once for the welcome.
          </p>
        </div>
      </div>
    </section>
  );
}
