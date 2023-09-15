import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "/logo.png";
import "./Navbar.scss";
import { LoginContext } from "../context/LoginManager";

function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const loginContext = useContext(LoginContext);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 600) {
        closeMobileMenu();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav>
      <div className="navbar-wrapper">
        <div className="navbar-left">
          <img src={logo} alt="Whale Icon" className="whale-icon" />
        </div>
        <div className="navbar-right">
          <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={faBars} />
          </div>
          <ul className={`navbar-links ${showMobileMenu ? "active" : ""}`}>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active-page" : "")}
                to="/"
                onClick={closeMobileMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active-page" : "")}
                to="/users"
                onClick={closeMobileMenu}
              >
                Users
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active-page" : "")}
                to="/posts"
                onClick={closeMobileMenu}
              >
                Posts
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active-page" : "")}
                to="/events"
                onClick={closeMobileMenu}
              >
                Events
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active-page" : "")}
                to="/map"
                onClick={closeMobileMenu}
              >
                Map
              </NavLink>
            </li>
            <li>
              {loginContext.isLoggedIn ? (
                <NavLink
                  className={({ isActive }) => (isActive ? "active-page" : "")}
                  to="/"
                  onClick={() => {
                    loginContext.logOut();
                    closeMobileMenu();
                  }}
                >
                  Logout
                </NavLink>
              ) : (
                <NavLink
                  className={({ isActive }) => (isActive ? "active-page" : "")}
                  to="/login"
                  onClick={closeMobileMenu}
                >
                  Login
                </NavLink>
              )}
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active-page" : "")}
                to="/search"
                aria-label="Search"
                onClick={closeMobileMenu}
              >
                🔎
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
