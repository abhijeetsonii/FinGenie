import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, XAxis, YAxis, Bar } from "recharts";

export default function Dashboard() {
  const [analysis, setAnalysis] = useState("Loading...");
  const [expenses, setExpenses] = useState([]);
  const COLORS = ["#6366F1", "#EC4899", "#10B981", "#F59E0B", "#EF4444"];

  useEffect(() => {
    axios.post("http://localhost:5000/api/cohere/analyze")
      .then((res) => setAnalysis(res.data.analysis))
      .catch(() => setAnalysis("Error loading analysis."));

    axios.get("http://localhost:5000/api/expenses/all")
      .then((res) => setExpenses(res.data))
      .catch(console.error);
  }, []);

  const categoryData = Object.values(
    expenses.reduce((acc, expense) => {
      acc[expense.category] = acc[expense.category] || { name: expense.category, value: 0 };
      acc[expense.category].value += expense.amount;
      return acc;
    }, {})
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">📊 FinGenie Dashboard</h1>
      <div className="mb-8 bg-gray-100 p-4 rounded whitespace-pre-line">{analysis}</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Spending by Category</h2>
          <PieChart width={300} height={250}>
            <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={100} label>
              {categoryData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Spending Over Time</h2>
          <BarChart width={350} height={250} data={expenses}>
            <XAxis dataKey="title" />
            <YAxis />
            <Bar dataKey="amount" fill="#6366F1" />
            <Tooltip />
          </BarChart>
        </div>
      </div>
    </div>
  );
}
