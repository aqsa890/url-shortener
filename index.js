const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { nanoid } = require("nanoid");
const path = require("path");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortId: String,
});

const Url = mongoose.model("Url", urlSchema);

/**
 * Create Short URL
 */
app.post("/api/shorten", async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "URL is required" });
    }

    const shortId = nanoid(7);

    const newUrl = new Url({
      originalUrl,
      shortId,
    });

    await newUrl.save();

    res.json({
      originalUrl,
      shortUrl: `${process.env.BASE_URL}/${shortId}`,
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * Redirect Route
 */
app.get("/:shortId", async (req, res) => {
  try {
    const { shortId } = req.params;

    const urlDoc = await Url.findOne({ shortId });

    if (!urlDoc) {
      return res.status(404).send("URL not found");
    }

    res.redirect(urlDoc.originalUrl);

  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Serve frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});