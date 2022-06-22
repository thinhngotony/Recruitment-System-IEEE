const Transactions = require("../models/transaction");

const getAllTransactions = (req, res) => {
  Transactions.find({}, function (error, transactions) {
    if (error) {
      res.status(500).send({
        message: "Error",
        data: null,
      });
    } else {
      let transactionsMap = [];
      transactions.forEach(function (transaction) {
        transactionsMap.push(transaction);
      });
      res.status(200).send({
        message: "Success",
        data: transactionsMap,
      });
    }
  });
};

const addTransaction = (req, res) => {
  const { from, to, status } = req.body;
  const transaction = new Transactions({
    from,
    to,
    status,
    createdAt: new Date(),
  });
  transaction.save((error) => {
    if (error) {
      res.status(500).send({
        message: "Error",
        data: null,
      });
    } else
      res.status(200).send({
        message: "Success",
        data: transaction,
      });
  });
};

module.exports = {
  getAllTransactions,
  addTransaction,
};
