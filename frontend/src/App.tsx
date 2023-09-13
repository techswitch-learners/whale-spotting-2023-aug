import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar.tsx";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Events from "./pages/Events.tsx";
import Users from "./pages/Users.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import UserProfile from "./pages/UserProfile.tsx";
import PostForm from "./pages/PostForm";
import EventForm from "./pages/EventForm.tsx";
import "./App.scss";
import SearchResult from "./pages/SearchResult.tsx";
import Footer from "./components/Footer/Footer.tsx";

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
        <Route
          path="/search-results/:bodyOfWaterName"
          element={<SearchResult />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/users/:userId" element={<UserProfile />} />
        <Route path="/posts/create" element={<PostForm />} />
        <Route path="/events/create" element={<EventForm />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
