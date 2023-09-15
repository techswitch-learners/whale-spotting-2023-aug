import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { tryEmailAndPassword } from "../clients/backendApiClient";
import Button from "../components/UI/Button";
import { LoginContext } from "../context/LoginManager";
import "./Login.scss";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const loginContext = useContext(LoginContext);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("login start");

    try {
      const result = await tryEmailAndPassword(email, password);

      if (result) {
        loginContext.logIn(email, password);
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
          <label>Email</label>
          <input
            className="textbox"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
