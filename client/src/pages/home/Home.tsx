import "./Home.css";
import HeroSection from "../../components/hero_components/HeroSection";
import PreviewSection from "../../components/preview_components/PreviewSection";

export default function Home() {
  return (
    <div className="home">
      <HeroSection />
      <PreviewSection />
    </div>
  );
}
