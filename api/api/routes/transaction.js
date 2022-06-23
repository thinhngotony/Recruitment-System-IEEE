const express = require("express");
const {
  getAllTransactions,
  addTransaction,
} = require("../controllers/transactions");
const router = express.Router();

// api get all transaction
router.get("/transaction", getAllTransactions);

// api add transaction
router.post("/transaction", addTransaction);

module.exports = router;
