import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar.tsx";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Events from "./pages/Events.tsx";
import Users from "./pages/Users.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Map from "./components/Map/Map.tsx";
import UserProfile from "./pages/UserProfile.tsx";
import PostForm from "./pages/PostForm";
import EventForm from "./pages/EventForm.tsx";
import PendingPosts from "./pages/PendingPosts.tsx";
import "./App.scss";
import "leaflet/dist/leaflet.js";

export const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/events" element={<Events />} />
        <Route path="/users" element={<Users />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/map" element={<Map />} />
        <Route path="/users/:userId" element={<UserProfile />} />
        <Route path="/posts/create" element={<PostForm />} />
        <Route path="/events/create" element={<EventForm />} />
        <Route path="/posts/pending" element={<PendingPosts />} />
      </Routes>
    </Router>
  );
};

export default App;
