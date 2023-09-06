import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar.tsx";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import LoginPage from "./components/LoginPage.tsx";
import RegisterPage from "./components/RegisterPage.tsx";
import "./App.scss";

export const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/register" Component={RegisterPage} />
      </Routes>
    </Router>
  );
};

export default App;
