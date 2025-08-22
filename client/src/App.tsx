import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Tracks from "./pages/track/Tracks";
import TrackInfo from "./pages/show_track/TrackInfo";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import ChannalLog from "./pages/channallog/ChannalLog";
import NewFooter from "./layouts/footer/NewFooter";
import Nav from "./layouts/Nav/Nav";
// import MusicPlayer from "./layouts/music_player/MusicPlayer";

// import useWindowSize from "./types/WindowSize";

function App() {
  // const width = useWindowSize();

  return (
    <BrowserRouter>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/about" element={<About />}></Route>

        <Route path="/tracks" element={<Tracks />}></Route>

        <Route path="/log" element={<ChannalLog />}></Route>

        <Route path="/track/:id" element={<TrackInfo />}></Route>
      </Routes>

      <NewFooter />
    </BrowserRouter>
  );
}

export default App;
