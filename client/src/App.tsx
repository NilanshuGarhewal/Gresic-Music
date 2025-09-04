// IMPORTS
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// PAGES / ROUTES
import Home from "./pages/Routes/home/Home";
import Tracks from "./pages/Routes/track/Tracks";
import TrackInfo from "./pages/Routes/show_track/TrackInfo";
import Search from "./pages/Routes/search/Search";
import Library from "./pages/Routes/library/Library";
import Admin from "./pages/admin/SecurityCheck";
import EditBeat from "./pages/CRUD/UpdatePage";

// LAYOUTS
import Nav from "./layouts/Nav/Nav";
import CreatePage from "./pages/CRUD/CreatePage";

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
