import Navbar from "./layouts/navbar/Navbar";
import Footer from "./layouts/footer/Footer";

import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Tracks from "./pages/track/Tracks";
import TrackInfo from "./pages/show_track/TrackInfo";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import MusicPlayer from "./layouts/music_player/MusicPlayer";
import ChannalLog from "./pages/channallog/ChannalLog";

function App() {
  const [songTitleForLocation, setSongTitleForLocation] = useState("");

  return (
    <BrowserRouter>
      <Navbar
        songTitleForLocation={songTitleForLocation}
        setSongTitleForLocation={setSongTitleForLocation}
      />

      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/about" element={<About />}></Route>

        <Route path="/tracks" element={<Tracks />}></Route>

        <Route path="/log" element={<ChannalLog />}></Route>

        <Route
          path="/track/:id"
          element={
            <TrackInfo setSongTitleForLocation={setSongTitleForLocation} />
          }
        ></Route>
      </Routes>

      <Footer />

      <MusicPlayer />
    </BrowserRouter>
  );
}

export default App;
