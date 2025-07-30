const Patient = require("../models/patient");

exports.createPatient = async (req, res) => {
  try {
    const { name, phone, message } = req.body;

    if (!name || !phone) {
      return res.status(400).send("ФИО и телефон обязательны");
    }

    const patient = new Patient({
      name,
      phone,
      message,
    });

    await patient.save();

    res.redirect("/");
  } catch (err) {
    console.error("Ошибка при сохранении заявки:", err);
    res.status(500).send("Ошибка сервера при отправке формы");
  }
};
