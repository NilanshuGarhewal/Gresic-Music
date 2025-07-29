import "./Home.css";
import HeroSection from "./components/hero/HeroSection";
import PreviewSection from "./components/preview/PreviewSection";

export default function Home() {
  return (
    <div className="home">
      <HeroSection />
      <PreviewSection />
    </div>
  );
}
