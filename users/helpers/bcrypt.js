const bcrypt = require("bcrypt");

// הצפנת סיסמה חדשה (Hash)
const generateUserPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

// השוואת סיסמה שהוזנה ב-Login מול הסיסמה המוצפנת ב-DB
const comparePassword = async (password, cryptPassword) => {
    return await bcrypt.compare(password, cryptPassword);
};

module.exports = { generateUserPassword, comparePassword };