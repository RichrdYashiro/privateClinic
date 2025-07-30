require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const { loginUser } = require("./controllers/user.controllers");
const auth = require("./middlewares/auth");
const { createPatient } = require("./controllers/patient.controller");
const Patient = require("./models/patient");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", "./pages");

app.get("/", (req, res) => {
  res.render("authorization");
});
app.post("/", async (req, res) => {
  try {
    const token = await loginUser(req.body.email, req.body.password);
    res.cookie("token", token);
    res.redirect("/table");
  } catch (e) {
    res.render("authorization", { error: e.message });
  }
});

app.get("/form", (req, res) => {
  res.render("form");
});
app.post("/form", createPatient);
app.get("/table", async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.redirect("/");

  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.render("table", { patient: patients || [] });
  } catch (err) {
    console.error("Ошибка при загрузке заявок:", err);
    res.status(500).send("Ошибка при загрузке данных");
  }
});

mongoose
  .connect(
    "mongodb+srv://richardyahiro:Ds2wSIdlXgiOSJBN@cluster0.ouzigow.mongodb.net/clinic?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Бэкенд запущен на http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" Ошибка подключения к MongoDB:", err);
  });
