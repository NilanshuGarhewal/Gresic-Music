// import HeroSection from "./components/hero/HeroSection";
import Search from "./components/search/Search";
import PreviewSection from "./components/preview/PreviewSection";

export default function Home() {
  return (
    <div className="home">
      {/* <HeroSection /> */}

      <Search />

      <div className="vid-frame">
        <p>Remixes</p>
        <iframe
          src="https://www.youtube.com/embed/MmTIdJCq1Fk?si=VC6kxcbmNB20gJmJ"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <PreviewSection />
    </div>
  );
}
