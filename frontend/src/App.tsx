import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.scss";
import Navbar from "./components/NavBar.tsx";

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
