const jwt = require("jsonwebtoken");
// const SECRET_KEY = "secret";
const SECRET_KEY = process.env.SECRET_KEY



// generate auth token

const generateAuthToken = (user) => {

    // crate payload (ID, isAdmin, isRecruiter)
    const payload = {
        _id: user._id,
        isAdmin: user.isAdmin,
        isRecruiter: user.isRecruiter,
    };

    // זה מייצר את הטוקן עצמו - פה יש טוקן ללא תאריך תפוגה ככה עשינו עם נועם
    // const token = jwt.sign(payload, SECRET_KEY); 

    // ⏳טוקן עם זמן תפוגה -  תקף ל-4 שעות בלבד
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "4h" });
    return token
};


// verify token

const verifyToken = (tokenFromClient) => {
    try {
        // payload - זה בעצם מידע על היוזר
        const payload = jwt.verify(tokenFromClient, SECRET_KEY);
        return payload;        
    } catch (error) {
        return null;        
    }
};

// ייצוא הפונקציות
module.exports = {generateAuthToken, verifyToken};