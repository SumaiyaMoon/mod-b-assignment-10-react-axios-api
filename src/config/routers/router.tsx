import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Project from "../../pages/Project";
import AddProject from "../../pages/AddProject";

export default function AppRouter() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Project />} />
          <Route path="add/" element={<AddProject />} />
          <Route path="add/:id" element={<AddProject />} />
        </Routes>
      </Router>
    </>
  );
}
