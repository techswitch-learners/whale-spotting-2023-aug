import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <ul>
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
    </ul>
  );
}

export default Navbar;
