const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = 5000;

// 1. Middlewares
app.use(cors()); // Iske bina frontend connect nahi ho payega
app.use(express.json()); // JSON data parhne ke liye

// 2. PostgreSQL Connection Setup
const pool = new Pool({
  user: 'postgres',           // Default user
  host: 'localhost',          // Agar DB isi PC par hai
  database: 'orderup_db',     // Aapka DB name
  password: 'Aapka_Password', // ⚠️ Yahan apna DB password likhein
  port: 5432,
});

// Test Database Connection
pool.connect((err) => {
  if (err) console.error('DB Connection Error ❌', err.stack);
  else console.log('Database Connected Successfully ✅');
});

// --- API ROUTES ---

// A. Home Route (Testing ke liye)
app.get('/', (req, res) => {
  res.send("OrderUp API is Live!");
});

// B. CREATE: Naya Order Place Karna (Student App se)
app.post('/api/orders', async (req, res) => {
  const { student_id, court_number, items, total_price, order_type } = req.body;
  
  try {
    const result = await pool.query(
      "INSERT INTO orders (student_id, court_number, items, total_price, order_type) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [student_id, court_number, JSON.stringify(items), total_price, order_type]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Order save nahi ho paya" });
  }
});

// C. READ: Order Status Check Karna (Student Tracking ke liye)
app.get('/api/orders/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Order nahi mila" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// D. UPDATE: Status Badalna (Vendor/Cook ke liye)
// Iska use karke cook status 'Pending' -> 'Preparing' -> 'Ready' karega
app.put('/api/orders/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // e.g. { "status": "Ready" }

  try {
    const result = await pool.query(
      "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    res.json({ message: "Status Updated!", order: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

// 3. Start Server
app.listen(PORT, () => {
  console.log(`🚀 OrderUp Server running on http://localhost:${PORT}`);
});