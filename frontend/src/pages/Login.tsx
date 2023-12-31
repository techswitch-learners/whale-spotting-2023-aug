import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import { LoginContext } from "../context/LoginManager";
import "./Login.scss";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const loginContext = useContext(LoginContext);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const loginResult = await loginContext.logIn(username, password);
      if (loginResult) {
        navigate("/");
      } else {
        setErrorMessage("Credentials not recognised. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Login failed. Please try again later.");
    }
  };

  return (
    <div className="login-page container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username</label>
          <input
            className="textbox"
            placeholder="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="textbox"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Login</Button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      <hr />
      <div className="createContainer">
        <p className="notRegistered">Don't have an account? </p>
        <p className="createAccountLink">
          <NavLink to="/register">Create Account</NavLink>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
