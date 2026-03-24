const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());


const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// GET: Tüm insanları listele
app.get('/api/people', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM people');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

// POST: Yeni birini ekle
app.post('/api/people', async (req, res) => {
  const { full_name, email } = req.body;
  if (!full_name || !email) return res.status(400).json({ error: "Eksik bilgi" });

  try {
    const result = await pool.query(
      'INSERT INTO people (full_name, email) VALUES ($1, $2) RETURNING *',
      [full_name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') res.status(409).json({ error: "EMAIL_ALREADY_EXISTS" });
    else res.status(500).json({ error: "Sunucu hatası" });
  }
});
// DELETE: Kişiyi Sil
app.delete('/api/people/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM people WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ error: "NOT_FOUND" });
    res.status(200).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT: Kişiyi Güncelle
app.put('/api/people/:id', async (req, res) => {
  const { full_name, email } = req.body;
  try {
    const result = await pool.query(
      'UPDATE people SET full_name = $1, email = $2 WHERE id = $3 RETURNING *',
      [full_name, email, req.params.id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: "NOT_FOUND" });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log('Backend 5000 portunda hazır!'));