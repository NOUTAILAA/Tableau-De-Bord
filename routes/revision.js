const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all revisions
router.get('/', (req, res) => {
  const query = 'SELECT * FROM revision';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Get a specific revision by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM revision WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0]);
  });
});

// Add a new revision
router.post('/', (req, res) => {
  const newRevision = req.body;
  const query = 'INSERT INTO revision SET ?';
  db.query(query, newRevision, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId });
  });
});

// Update a revision
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updatedRevision = req.body;
  const query = 'UPDATE revision SET ? WHERE id = ?';
  db.query(query, [updatedRevision, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Revision updated successfully' });
  });
});

// Delete a revision
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM revision WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Revision deleted successfully' });
  });
});

module.exports = router;
