import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar.tsx";
import Home from "./pages/Home";
import "./App.scss";

export const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
