import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
