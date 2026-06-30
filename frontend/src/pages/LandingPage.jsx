import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import ModuleEcosystem from "../components/landing/ModuleEcosystem";
import WhyChoose from "../components/landing/WhyChoose";
import Statistics from "../components/landing/Statistics";
import LearningJourney from "../components/landing/LearningJourney";
import Testimonials from "../components/landing/Testimonials";
import Footer from "../components/landing/Footer";
const LandingPage = () => {
  return (
    <div className="bg-[#050816]">
      <Navbar />
      <Hero />
      <ModuleEcosystem />
        <WhyChoose />
        <Statistics/>
        <LearningJourney/>
        <Testimonials/>
        <Footer/>
    </div>
  );
};

export default LandingPage;