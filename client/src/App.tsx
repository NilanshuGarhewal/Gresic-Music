// IMPORTS
import { BrowserRouter, Routes, Route } from "react-router-dom";

// PAGES / ROUTES
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Tracks from "./pages/track/Tracks";
import TrackInfo from "./pages/show_track/TrackInfo";

// LAYOUTS
import Nav from "./layouts/navbar/Nav";
import Footer from "./layouts/footer/Footer";

// MAIN APP
const App = () => {
  return (
    <BrowserRouter>
      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/about" element={<About />}></Route>

        <Route path="/tracks" element={<Tracks />}></Route>

        <Route path="/track/:id" element={<TrackInfo />}></Route>
      </Routes>

      {/* LAYOUTS */}
      <Nav />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
