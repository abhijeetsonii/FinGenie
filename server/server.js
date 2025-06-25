const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

// Import routes
const expenseRoutes = require("./routes/expenseRoutes");
const cohereRoutes = require("./routes/cohereRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB error:", err));


// Routes
app.get("/", (req, res) => res.send("API is running"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use("/api/expenses", expenseRoutes);
app.use("/api/cohere", cohereRoutes);

