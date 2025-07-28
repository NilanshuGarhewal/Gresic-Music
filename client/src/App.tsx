import Navbar from "./layouts/Navbar/Navbar";
import Footer from "./layouts/Footer/Footer";

import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import Tracks from "./pages/Track/Tracks";
import TrackInfo from "./pages/ShowTrack/TrackInfo";

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
