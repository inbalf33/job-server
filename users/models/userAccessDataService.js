const { generateAuthToken } = require("../../auth/providers/jwt");
const { createError } = require("../../utils/handleErrors");
const { generateUserPassword, comparePassword } = require("../helpers/bcrypt");
const returnUser = require("../helpers/returnUser");
const User = require("./mongodb/User");
// jobValidationService.js

// register new user
const registerUser = async (nweUser) => {
    try {
        nweUser.password = await generateUserPassword(nweUser.password);
        let user = new User(nweUser);
        user = await user.save(); // שמירה במסד הנתונים
        return user;
    } catch (error) {
        //  throw new Error("Mongoose: " + error.message);
        return createError("Mongoose", error.message); 
    }
};


// get user (specific user)
const getUser = async (userId) => {
    try {
        let user = await User.findById(userId);
        return user;
    } catch (error) {
        //  throw new Error("Mongoose: " + error.message);
        return createError("Mongoose", error.message);
    }
};


// get ALL users
const getAllUsers = async () => {
    try {
        let users = await User.find();
        return users;
    } catch (error) {
        // throw new Error("Mongoose: " + error.message);
        return createError("Mongoose", error.message);
    }
};

// Login

const loginUser = async (email, password) => {
    try {
        const userFromDB = await User.findOne({email});
        // בדיקה האם יש יוזר כזה - האם המייל ב- DB
        if (!userFromDB) {
            // throw new Error("Mongoose: " + error.message);
            // throw new Error("Invalid email or password");
            return createError("Authentication", "User not exist", 401);
        }

        const comparation = await comparePassword(password, userFromDB.password)
        // בדיקה האם הסיסמא שהוא נתן זו הסיסמא ב- DB
        // if (userFromDB.password !== password) {
        if (!comparation) {
            // throw new Error("Mongoose: " + error.message);
            // throw new Error("Invalid email or password");
            return createError("Authentication", "Invalid email or password", 401);
        }

        // אם זה מגיע לפה - ההתחברות בוצעה בהצלחה  - נרצה לייצר טוקן לאותן יוזר
        const token = generateAuthToken(userFromDB)
        return token;
    } catch (error) {
        //  throw new Error(error);
        createError("Authentication", error.message);
        
    }
};

// Update user
const updateUser = async (userId, updatedUser) => {
    try {
        const userFromDB = await User.findById(userId)

        if (!userFromDB) {
            return createError("Authentication", "User not exist", 400);
        }

        let user = await User.findByIdAndUpdate(userId, updatedUser);
        user = await user.save();
        return returnUser(user);        
    } catch (error) {
        return createError("Mongoose", error.message)        
    }
};

// update isRecuruiter status
const changeRecuruiterStatus = async (userId) => {
    try {
    let user = await User.findById(userId);
    if (!user) {
        return createError("Authentication", "User not exist", 400);
    }
    user.isRecruiter = !user.isRecruiter;
    user = await user.save();
    return returnUser(user); 
        
    } catch (error) {
        return createError("Mongoose", error.message);        
    }
};

// Delete user
const deleteUser = async (userId) => {
    try {
        let user = await User.findById(userId);

        if (!user) {
            return createError("Authentication", "User not exist", 400);
        }

        user = await User.findByIdAndDelete(userId);
        return returnUser(user);        
    } catch (error) {
        return createError("Mongoose", error.message);      
    }
};

module.exports = {registerUser, getUser, getAllUsers, loginUser, updateUser, changeRecuruiterStatus, deleteUser};