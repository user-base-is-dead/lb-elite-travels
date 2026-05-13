import AboutHero from "./AboutComponents/AboutHero/AboutHero.jsx";
import OurStory from "./AboutComponents/OurStory/OurStory.jsx";
import MissionVision from "./AboutComponents/MissionVision/MissionVision.jsx";
import TeamSection from "./AboutComponents/TeamSection/TeamSection.jsx";
import "./About.css";

export default function About() {
  return (
    <div className="about page">
      <AboutHero />
      <OurStory />
      <MissionVision />
      <TeamSection />
    </div>
  );
}
