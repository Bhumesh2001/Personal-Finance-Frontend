import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Transactions from "./pages/Transactions";
import Dashboard from "./pages/Dashboard";
import Budgets from "./pages/Budgets";
import Navigation from "./components/Navbar";

export default function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/budgets" element={<Budgets />} />
        <Route path="/" element={<Dashboard />} />  {/* Default Page */}
      </Routes>
    </Router>
  );
};
