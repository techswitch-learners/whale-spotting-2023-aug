import { useState } from "react";
import "./RegisterPage.scss";
import { tryRegisterNewUser } from "../clients/backendApiClient";
import Button from "./UI/Button";

function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // backend logic will add later

    try {
      const result = await tryRegisterNewUser(
        fullName,
        username,
        email,
        password,
      );

      if (result) {
        console.log("Register New User successful"); //to be deleted
        setErrorMessage("New User created successfully");
      } else {
        console.log("Failed to create new user");
        setErrorMessage("Unsuccessful Create New user attempt");
      }
    } catch (error) {
      setErrorMessage("Create user failed. Please try again later.");
    }
  };
  //   if (fullName && email && password) {
  //     setErrorMessage("");
  //   } else {
  //     setErrorMessage("Please fill in all fields.");
  //   }
  // };

  return (
    <div className="register-page">
      <h2>Create Account</h2>
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
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <Button submit={true}>Submit</Button>
      </form>
    </div>
  );
}

export default RegisterPage;
