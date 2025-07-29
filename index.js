const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "./pages");

app.get("/", (req, res) => {
  res.render("authorization");
});

app.get("/form", (req, res) => {
  res.render("form");
});

app.get("/table", (req, res) => {
  res.render("table");
});

mongoose
  .connect(
    "mongodb+srv://richardyahiro:Ds2wSIdlXgiOSJBN@cluster0.ouzigow.mongodb.net/hotel?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Бэкенд запущен на http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" Ошибка подключения к MongoDB:", err);
  });
