const mongoose = require("mongoose");
const transactionsSchema = new mongoose.Schema({
  from: {
    type: String,
  },
  to: {
    type: String,
  },
  status: {
    type: Number,
    enum: [0, 1, 2],
  },
  createdAt: {
    type: Date
  }
});

const Transactions = mongoose.model("Transactions", transactionsSchema);

module.exports = Transactions;