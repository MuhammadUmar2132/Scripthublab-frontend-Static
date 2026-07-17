import Hero from "@/components/home/Hero";
import TechStrip from "@/components/home/TechStrip";
import Services from "@/components/home/Services";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Projects from "@/components/home/Projects";
import Articles from "@/components/home/Articles";
import LeadPopup from "@/components/common/LeadPopup";

export default function Home() {
  return (
    <>
      <Hero />
      <TechStrip />
      <Services />
      <WhyChooseUs />
      <Projects />
      <Articles />
      <LeadPopup />
    </>
  );
}
