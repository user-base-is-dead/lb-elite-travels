import HeroSection from "./HomeComponents/HeroSection/HeroSection.jsx";
import FeaturedDestinations from "./HomeComponents/FeaturedDestinations/FeaturedDestinations.jsx";
import WhyChooseUs from "./HomeComponents/WhyChooseUs/WhyChooseUs.jsx";
import StatsCounter from "./HomeComponents/StatsCounter/StatsCounter.jsx";
import Testimonials from "./HomeComponents/Testimonials/Testimonials.jsx";
import "./Home.css";

export default function Home() {
  return (
    <div className="home page">
      <HeroSection />
      <StatsCounter />
      <FeaturedDestinations />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
}
