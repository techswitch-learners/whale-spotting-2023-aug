import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar.tsx";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Event from "./components/Event/Event.tsx";
import Users from "./pages/Users.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import SubmissionForm from "./pages/SubmissionForm";
import "./App.scss";

export const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/event" element={<Event />} />
        <Route path="/users" element={<Users />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/submission-form" element={<SubmissionForm />} />
      </Routes>
    </Router>
  );
};

export default App;
