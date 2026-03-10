import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public")); // serve frontend files

app.post("/api/post", async (req, res) => {
  try { 
  // Basic Authentication with base64 encoding 
    const authString = `${process.env.API_TOKEN}:${process.env.API_SECRET}`;
    const encodedAuth = Buffer.from(authString).toString('base64');

   // Alloy API 
    const payload = req.body;
    const response = await fetch("https://sandbox.alloy.co/v1/evaluations", {
      method: "POST",
      headers: {
    // "Authorization": `Bearer ${process.env.API_TOKEN}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    res.status(response.status).json(data);

  } catch (err) {
    console.error("Backend error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
