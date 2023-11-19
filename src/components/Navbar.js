import InstagramIcon from "@mui/icons-material/Instagram";
import { IconButton } from "@mui/material";

import { NavLink } from "react-router-dom";
const Navbar = () => {
  const instagramLogoStyle = {
    right: "50px",
  };

  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav fs-5">
            <li className="nav-item ">
              <NavLink
                to="/homepage"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                aria-current="page"
                end
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/paintings"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                aria-current="page"
                end
              >
                Paintings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/potraits"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                aria-current="page"
                end
              >
                Potraits
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/photography"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                aria-current="page"
                end
              >
                Photography
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                aria-current="page"
                end
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                aria-current="page"
                end
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <IconButton
            sx={instagramLogoStyle}
            onClick={() => window.open("https://www.instagram.com/utpal.ogs/")}
          >
            <InstagramIcon />
          </IconButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
