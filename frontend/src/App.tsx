import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.scss";
import "./styles/typography.scss";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
