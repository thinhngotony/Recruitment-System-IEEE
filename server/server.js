const express = require("express");
var cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const admin = require("firebase-admin");
const serviceAccount = "./client_secrets.json";
const transactionsRouter = require("./api/routes/transaction");
const filesRouter = require("./api/routes/files");

// set base direction
global.__basedir = __dirname;

// Declare port
const PORT = process.env.PORT;

// Connect mongoDB Atlas
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const mongodb = mongoose.connection;
mongodb.on("error", console.error.bind(console, "connection error:"));
mongodb.once("open", function () {
  console.log("Connected successfully");
});

// Connect firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

app.use(cors());
app.use(bodyParser.json());

// api get OTP
app.get("/api/getOtp/:address", async (req, res) => {
  const { address } = req.params;
  try {
    const cityRef = db.collection("otp_authentication").doc(address);
    const doc = await cityRef.get();
    if (!doc.exists) {
      res.status(200).send({
        message: "No such document",
        data: null,
      });
    } else {
      res.status(200).send({
        message: "Success",
        data: doc.data(),
      });
    }
  } catch (e) {
    res.send({
      message: "Failed",
      data: null,
    });
  }
});

// api transactions
app.use("/api/transactions", transactionsRouter);

// api file
app.use("/api/files", filesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
