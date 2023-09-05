import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./components/LoginPage";
import "./App.scss";


export const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" Component={LoginPage} />
      </Routes>
    </Router>
  );
};

export default App;
