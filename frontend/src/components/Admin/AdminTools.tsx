import { useContext, useEffect, useState, useCallback } from "react";
import { LoginContext } from "../../context/LoginManager";
import "./AdminTools.scss";
import { NavLink } from "react-router-dom";
import { getAllPendingPosts } from "../../clients/backendApiClient";

const AdminTools = () => {
  const loginContext = useContext(LoginContext);
  const [pendingPosts, setPendingPosts] = useState(0);

  const getPendingPostCount = useCallback(async () => {
    const pendingPosts = await getAllPendingPosts(loginContext.encodedAuth);
    if (pendingPosts) {
      setPendingPosts(pendingPosts.posts.length);
    }
  }, [loginContext.encodedAuth]);

  useEffect(() => {
    if (loginContext.isAdmin) {
      getPendingPostCount();
    }
  }, [loginContext.isAdmin, getPendingPostCount]);

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
              {pendingPosts > 0 && (
                <span className="AdminTools__post-count">{pendingPosts}</span>
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
