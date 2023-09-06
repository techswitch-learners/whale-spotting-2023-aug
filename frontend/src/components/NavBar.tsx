import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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
          <img
            src="https://cdn-icons-png.flaticon.com/512/4971/4971976.png"
            alt="Whale Icon"
            className="whale-icon"
          />
        </div>
        <div className="navbar-right">
          <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={faBars} />
          </div>
          <ul className={`navbar-links ${showMobileMenu ? "active" : ""}`}>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/users">Users</NavLink>
            </li>
            <li>
              <NavLink to="/posts">Posts</NavLink>
            </li>
            <li>
              <NavLink to="/info">Info</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/search" aria-label="Search">
                🔍
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
