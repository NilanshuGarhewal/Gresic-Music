import TrailContainer from "../../components/Trail/TrailContainer";
import HeroSection from "./components/HeroSection";

// import Transition from "../../components/Transition/Transition";

import fffimg from "../../assets/images/gresic_logo.png";

const Home = () => {
  return (
    <div className="home">
      <div className="fff-logo">
        <img src={fffimg} alt="logo" />
      </div>
      <TrailContainer />
      <HeroSection />
    </div>
  );
};

export default Home;
