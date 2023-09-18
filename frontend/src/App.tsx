import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { LoginManager } from "./context/LoginManager.tsx";
import Navbar from "./components/NavBar.tsx";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Events from "./pages/Events.tsx";
import Users from "./pages/Users.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import MapPage from "./pages/MapPage.tsx";
import UserProfile from "./pages/UserProfile.tsx";
import PostForm from "./pages/PostForm";
import EventForm from "./pages/EventForm.tsx";
import SearchResults from "./pages/SearchResult.tsx";
import PendingPosts from "./pages/PendingPosts.tsx";
import Post from "./pages/Post.tsx";
import Footer from "./components/Footer/Footer.tsx";
import Error404Page from "./pages/Error404Page.tsx";
import "./App.scss";
import "leaflet/dist/leaflet.js";

const App = () => {
  return (
    <Router>
      <LoginManager>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/events" element={<Events />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/register" element={<Register />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/users/:userId" element={<UserProfile />} />
          <Route path="/posts/create" element={<PostForm />} />
          <Route path="/events/create" element={<EventForm />} />
          <Route path="/posts/pending" element={<PendingPosts />} />
          <Route path="/posts/:postId" element={<Post />} />
          <Route path="/*" element={<Error404Page />} />
        </Routes>
        <Footer />
      </LoginManager>
    </Router>
  );
};

export default App;
