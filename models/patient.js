const mongoose = require("mongoose");

const PatientSchema = mongoose.Schema({
  name: {
    type: String,

    required: true,
  },
  phone: {
    type: String,
    match: [/^[\+]?[0-9\s\-\(\)]+$/, "Введите корректный номер телефона"],
    required: true,
  },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("records", PatientSchema);
