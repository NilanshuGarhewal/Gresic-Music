import slideImg from "../../../../assets/images/slide.png";

export default function HeroSection() {
  return (
    <div className="hero-section">
      <div className="slider-track">
        {[...Array(8)].map((_, i) => (
          <img key={i} className="slide" src={slideImg} alt="nature" />
        ))}
      </div>
    </div>
  );
}
