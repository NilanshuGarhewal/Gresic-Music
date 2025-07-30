import HeroSection from "./components/hero/HeroSection";
import Search from "./components/search/Search";
// import PreviewSection from "./components/preview/PreviewSection";

export default function Home() {
  return (
    <div className="home">
      <HeroSection />
      <Search />
      {/* <PreviewSection /> */}
    </div>
  );
}
