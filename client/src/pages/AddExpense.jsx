import { useState } from "react";
import axios from "axios";

export default function AddExpense() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !category || !amount) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/expenses/add", {
        title,
        category,
        amount: Number(amount),
      });
      setMessage("✅ Expense added!");
      setTitle(""); setCategory(""); setAmount("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add expense.");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="max-w-md w-full mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded w-full" type="submit">
          Submit
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  </div>
);
}
