import { Link } from "react-router-dom";
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
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>
              <Link to="/map">Map</Link>
            </li>
            <li>
              {isLoggedIn ? (
                <Link to="/">Logout</Link>
              ) : (
                <Link to="/login">Login</Link>
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
