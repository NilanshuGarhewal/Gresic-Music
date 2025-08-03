import Navbar from "./layouts/Navbar/Navbar";
import Footer from "./layouts/Footer/Footer";

// import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import Tracks from "./pages/Track/Tracks";
import TrackInfo from "./pages/ShowTrack/TrackInfo";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
// import Player from "./layouts/MusicPlayer/Player";
import MusicPlayer from "./layouts/MusicPlayer/MusicPlayer";

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

        {/* <Route path="/about" element={<About />}></Route> */}

        <Route path="/tracks" element={<Tracks />}></Route>

        <Route
          path="/track/:id"
          element={
            <TrackInfo setSongTitleForLocation={setSongTitleForLocation} />
          }
        ></Route>
      </Routes>

      <Footer />

      {/* <Player /> */}
      <MusicPlayer />
    </BrowserRouter>
  );
}

export default App;
