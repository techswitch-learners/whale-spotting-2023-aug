import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar.tsx";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import SubmissionForm from "./pages/SubmissionForm";
import UserProfile from "./pages/UserProfile.tsx";
import "./App.scss";

export const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/submission-form" element={<SubmissionForm />} />
      </Routes>
    </Router>
  );
};

export default App;
