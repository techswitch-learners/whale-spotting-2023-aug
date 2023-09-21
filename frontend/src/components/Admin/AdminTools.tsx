import { useContext, useEffect } from "react";
import { LoginContext } from "../../context/LoginManager";
import { NavLink, useLocation } from "react-router-dom";
import "./AdminTools.scss";

const AdminTools = () => {
  const loginContext = useContext(LoginContext);
  const location = useLocation();

  useEffect(() => {
    if (loginContext.isAdmin) {
      loginContext.updatePendingPostCount(loginContext.encodedAuth);
    }
  }, [loginContext, location]);

  if (!loginContext.isAdmin) {
    return <></>;
  } else {
    return (
      <nav className="AdminTools">
        <p className="AdminTools__title">Admin Tools:</p>
        <ul className="AdminTools__navbar-links">
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active-page" : "")}
              to="/posts/pending"
            >
              Pending Posts{" "}
              {loginContext.pendingPostCount > 0 && (
                <span className="AdminTools__post-count">
                  {loginContext.pendingPostCount}
                </span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active-page" : "")}
              to="/events/create"
            >
              Create Event
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
};

export default AdminTools;
