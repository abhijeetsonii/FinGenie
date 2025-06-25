import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";

function App() {
  return (
    <Router>
      <nav className="flex gap-4 p-4 bg-gray-200 shadow">
        <Link to="/">Dashboard</Link>
        <Link to="/add">Add Expense</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddExpense />} />
      </Routes>
    </Router>
  );
}
export default App;