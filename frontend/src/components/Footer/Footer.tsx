import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../../context/LoginManager";
import "./Footer.scss";

function Footer() {
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <footer className="section-dark">
      <div className="Footer container">
        <div className="Footer__Title">
          <img
            className="Footer__Title__Logo"
            src="./logo.png"
            alt="WhaleSpotting Logo"
          />
          <h4>Explore the Whale Spotting site</h4>
        </div>
        <div>
          <ul className="Footer__Links">
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active-page" : "")}
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active-page" : "")}
                to="/users"
              >
                Users
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active-page" : "")}
                to="/posts"
              >
                Posts
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active-page" : "")}
                to="/events"
              >
                Events
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active-page" : "")}
                to="/map"
              >
                Map
              </NavLink>
            </li>
            <li>
              {isLoggedIn ? (
                <NavLink
                  className={({ isActive }) => (isActive ? "active-page" : "")}
                  to="/logout"
                >
                  Logout
                </NavLink>
              ) : (
                <NavLink
                  className={({ isActive }) => (isActive ? "active-page" : "")}
                  to="/login"
                >
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
      <p className="Copyright">© July 2023 Cohort @ Techswitch</p>
    </footer>
  );
}

export default Footer;
