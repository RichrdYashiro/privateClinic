const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://richardyahiro:Ds2wSIdlXgiOSJBN@cluster0.ouzigow.mongodb.net/hotel?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Бэкенд запущен на http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(" Ошибка подключения к MongoDB:", err);
  });
