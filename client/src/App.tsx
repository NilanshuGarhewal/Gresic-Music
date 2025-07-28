import "./App.css";

import Navbar from "./other/navbar/Navbar";
import About from "./pages/about/About";
import Home from "./pages/home/Home";
import Tracks from "./pages/tracks/Tracks";
import TrackInfo from "./pages/track_info/TrackInfo";
import Footer from "./other/footer/Footer";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/about" element={<About />}></Route>

        <Route path="/tracks" element={<Tracks />}></Route>

        <Route path="/track/:id" element={<TrackInfo />}></Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
