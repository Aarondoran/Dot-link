const express = require("express");

const app = express();
const PORT = process.env.PORT;

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // SSL
});


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use((req, res) => {
  res.status(404).sendFile(__dirname + "/public/not_found.html");
});


// Shorten URL with custom alias (no empty alias)
app.post("/api/shorten", async (req, res) => {
  let { originalUrl, customAlias } = req.body;

  // Ensure the alias is not empty
  if (!customAlias) return res.status(400).json({ error: "Custom alias is required" });

  if (!/^https?:\/\//i.test(originalUrl)) {
    originalUrl = `https://${originalUrl}`;
  }

  // Check if the custom alias already exists in the database
  const existing = await pool.query("SELECT * FROM urls WHERE short_id = $1", [customAlias]);

  if (existing.rows.length > 0) return res.status(400).json({ error: "Alias already exists" });

  // Insert the new shortened URL with the custom alias
  await pool.query(
    "INSERT INTO urls (short_id, original_url) VALUES ($1, $2)",
    [customAlias, originalUrl]
  );

  res.json({ shortUrl: `${req.protocol}://${req.get("host")}/${customAlias}` });
});

// Redirect shortened URL directly using the alias
app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM urls WHERE short_id = $1", [id]);

  if (result.rows.length === 0) return res.status(404).sendFile(__dirname + "/public/not_found.html");

  const urlEntry = result.rows[0];

  // Increment the click count
  await pool.query("UPDATE urls SET clicks = clicks + 1 WHERE short_id = $1", [id]);

  res.redirect(urlEntry.original_url);
});

// Check URL details
app.get("/check/:id", async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM urls WHERE short_id = $1", [id]);

  if (result.rows.length === 0) return res.status(404).sendFile(__dirname + "/public/not_found.html");

  const urlEntry = result.rows[0];

  res.send(`
    <h1>Shortened URL Details</h1>
    <p><b>Short URL:</b> ${req.protocol}://${req.get("host")}/${id}</p>
    <p><b>Original URL:</b> <a href="${urlEntry.original_url}" target="_blank">${urlEntry.original_url}</a></p>
    <p><b>Clicks:</b> ${urlEntry.clicks}</p>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
