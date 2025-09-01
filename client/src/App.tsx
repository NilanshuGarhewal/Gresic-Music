// IMPORTS
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// PAGES / ROUTES
import Home from "./pages/home/Home";
import Tracks from "./pages/track/Tracks";
import TrackInfo from "./pages/show_track/TrackInfo";
import Search from "./pages/search/Search";
import Library from "./pages/library/Library";
import Admin from "./pages/admin/Admin";
import EditBeat from "./pages/admin/EditPage";

// LAYOUTS
import Nav from "./layouts/Nav/Nav";
import CreatePage from "./pages/admin/CreatePage";

// MAIN APP
const App = () => {
  return (
    <BrowserRouter>
      {/* ROUTES */}

      <Routes>
        <Route path="/home" element={<Home />}></Route>

        <Route path="/tracks" element={<Tracks />}></Route>

        <Route path="/track/:id" element={<TrackInfo />}></Route>

        <Route path="/library" element={<Library />}></Route>

        <Route path="/search" element={<Search />}></Route>

        <Route path="/admin" element={<Admin />}></Route>

        <Route path="/edit/:id" element={<EditBeat />}></Route>

        <Route path="/create" element={<CreatePage />}></Route>

        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>

      {/* LAYOUTS */}
      <Nav />
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default App;
