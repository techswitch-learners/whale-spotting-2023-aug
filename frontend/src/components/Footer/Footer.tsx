import { NavLink } from "react-router-dom";
import "./Footer.scss";

function Footer() {
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
                to="/login"
              >
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <p className="Copyright">© July 2023 Cohort @ Techswitch</p>
    </footer>
  );
}

export default Footer;
