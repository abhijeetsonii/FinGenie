const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const { CohereClient } = require("cohere-ai");
require("dotenv").config();

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

router.post("/analyze", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });

    const summaryText = expenses.map(e =>
      `• ${e.title} — ₹${e.amount} in ${e.category} on ${e.date.toDateString()}`
    ).join("\n");

    const prompt = `
You are an intelligent personal finance assistant.
Given the following list of expenses, provide:
1. Total spending
2. Top 3 categories
3. Suggestions to reduce cost
4. A monthly budget planning tip

Expenses:
${summaryText}
`;

    const response = await cohere.generate({
      model: "command-r-plus",
      prompt,
      max_tokens: 400,
      temperature: 0.7,
    });

    const text = response.generations[0].text;
    res.json({ analysis: text.trim() });
  } catch (error) {
    console.error("Cohere error:", error.message);
    res.status(500).json({ error: "Cohere analysis failed" });
  }
});

module.exports = router;
