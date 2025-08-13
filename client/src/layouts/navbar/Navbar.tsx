// import Location from "./components/Location";
import NavLogo from "./components/NavLogo";
import NavSearch from "./components/NavSearch";
import NavTools from "./components/NavTools";

interface NavbarProps {
  songTitleForLocation: string;
  setSongTitleForLocation: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar = ({
  songTitleForLocation,
  setSongTitleForLocation,
}: NavbarProps) => {
  return (
    <div className="navbar">
      <div className="nav-wrapper">
        <NavLogo />

        <div className="nav-container">
          <NavSearch />

          <NavTools />
        </div>
      </div>

      {/* <Location
        songTitleForLocation={songTitleForLocation}
        setSongTitleForLocation={setSongTitleForLocation}
      /> */}
    </div>
  );
};

export default Navbar;
