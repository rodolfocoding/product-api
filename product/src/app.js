"use strict";

const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
require("dotenv").config();

const app = express();

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@myprojects.qkmop.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//Carregando os models
const Product = require("./models/product");
const Customer = require("./models/customer");
const Order = require("./models/Order");

//carregar rotas
const indexRoute = require("./routes/index-route");
const productRoute = require("./routes/product-route");
const customerRoute = require("./routes/customer-route");
const orderRoute = require("./routes/order-route");

app.use(
  express.json({
    limit: "5mb",
  })
);

app.use((req, res, next) => {
  //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
  res.header("Access-Control-Allow-Origin", "*");
  //Quais são os métodos que a conexão pode realizar na API
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  app.use(cors());
  next();
});

app.use("/", indexRoute);
app.use("/products", productRoute);
app.use("/customers", customerRoute);
app.use("/orders", orderRoute);

module.exports = app;
