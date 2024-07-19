const express = require("express");
const cors = require("cors");
const app = express();
const Transaction = require("./models/transaction.js");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.post("/api/transaction", async (req,res)=>{
    await mongoose.connect(process.env.Mongo_URL);
    const {price,name,description,datetime} = req.body;
    const trans = await Transaction.create({price,name,description,datetime});
    res.json(trans);
});

app.get("/api/transactions", async (req,res)=>{
    await mongoose.connect(process.env.Mongo_URL);
    const transactions = await Transaction.find({});
    res.json(transactions);
});
app.get("/api/test", (req,res)=>{
    res.send("working");
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});


