import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerNewUser } from "../clients/backendApiClient";
import Button from "../components/UI/Button";
import "./Register.scss";

function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const success = await registerNewUser(
        fullName,
        username,
        email,
        password,
        profileImageUrl,
      );

      if (success) {
        navigate("/login");
      } else {
        setErrorMessage("Please check the information provided");
      }
    } catch (error) {
      setErrorMessage("Create user failed. Please try again later.");
    }
  };

  return (
    <div className="register-page container">
      <h1>Create Account</h1>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
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
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Profile Picture URL</label>
          <input
            type="url"
            placeholder="Profile Picture URL"
            value={profileImageUrl}
            onChange={(e) => setProfileImageUrl(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Submit</Button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default RegisterPage;
