const User = require("../models/users");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../constants");
async function loginUser(email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Нет такого пользователя");
  if (user.password !== password) throw new Error("Неверный пароль");
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
}

module.exports = { loginUser };
