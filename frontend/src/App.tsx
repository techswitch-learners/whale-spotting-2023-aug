import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SubmissionForm from "./pages/SubmissionForm";
import "./App.scss";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/submission-form" element={<SubmissionForm />} />
      </Routes>
    </Router>
  );
};

export default App;
