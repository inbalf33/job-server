const express = require("express");
const { registerUser, getUser, getAllUsers, loginUser, updateUser, changeRecuruiterStatus, deleteUser } = require("../models/userAccessDataService");
const auth = require("../../auth/authService");
const returnUser = require("../helpers/returnUser");
const { validateRegister, validateLogin, validateEditUser} = require("../validation/Joi/userValidationService");
const { createError, handleError  } = require("../../utils/handleErrors");
const { generateUserPassword } = require("../helpers/bcrypt");

const router = express.Router();

// POST - create new user
router.post("/", async (req, res) => {
    try {
        let newUser = req.body;

        const errorMessage = validateRegister(newUser);

        if (errorMessage != "") {
            return createError("Validation", errorMessage, 400)
        }


        let user = await registerUser(newUser)
        // res.status(201).send(user);   
        res.status(201).send(returnUser(user));   
    } catch (error) {
        // res.status(400).send(error.message);
        return handleError(res, error.status, error.message);
    }
});



// GET - user by id
router.get("/:id", auth, async (req, res) => {
    try {
        const {id} = req.params;

        const userInfo = req.user;
        // בדיקה אם היוזר לא אדמין או 
        // if (!userInfo.isAdmin && userInfo._id != user._id) {
        if (!userInfo.isAdmin && userInfo._id !== id) {
            // return res.status(403).send("Only the own user can show is details")
            return createError("Authorization", "Only the own user can show is details", 403);
        }


        let user = await getUser(id);
        res.status(200).send(returnUser(user));        
    } catch (error) {
        // res.status(400).send(error.message);
        return handleError(res, error.status, error.message);
    }
});


// GET - all users - רק אדמין

router.get("/", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        if (!userInfo.isAdmin ) {
            // return res.status(403).send("Only admin user can get all users")
            return createError("Authorization", "Only admin user can get all users", 403);
        }

        let users = await getAllUsers();
        res.send(users).status(200);        
    } catch (error) {
        // res.status(400).send(error.message);
        return handleError(res, error.status, error.message);
    }
});


// Login user
router.post("/login", async (req, res) => {
    try {
        let { email, password } = req.body;

        const errorMessage = validateLogin(req.body); // <-- קריאה ישירה לפונקציה

        if (errorMessage != "") {
            return createError("Validation", errorMessage, 400); // <-- תוקן הפסיק
        }

        const token = await loginUser(email, password);
        res.status(200).send(token);        
    } catch (error) {
        return handleError(res, error.status, error.message);
    }
});


// Update user

router.put("/:id", auth, async (req, res) => {
  let userInfo = req.user;
  let updatedUser = req.body;
  const { id } = req.params;

  try {
    if (userInfo._id !== id) {
      return createError("Authorization", "Only the user can edit is details", 403);
    }

    // --- כאן מחליפים ל-validateEditUser במקום validateRegister ---
    const errorMessage = validateEditUser(updatedUser);
    if (errorMessage != "") {
      return createError("Validation", errorMessage, 400);
    }

    // הצפנת הסיסמה מחדש רק אם המשתמש הקליד סיסמה חדשה
    if (updatedUser.password) {
      updatedUser.password = await generateUserPassword(updatedUser.password);
    }

    let user = await updateUser(id, updatedUser);
    res.status(200).send(returnUser(user));    
  } catch (error) {
    return handleError(res, 400, error.message);    
  }
});


// update isRecuruiter status
router.patch("/:id", auth, async (req, res) => {
  const { id } = req.params;
  let userInfo = req.user;

  try {
    if (userInfo._id !== id) {
      return createError(
        "Authorization",
        "Only the own user can change his status",
        403,
      );
    }

    let user = await changeRecuruiterStatus(id);
    res.status(201).send(returnUser(user))
  } catch (error) {
    return handleError(res, 400, error.message);
  }
});


// Delete user
router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  let userInfo = req.user;

  try {
    if (!userInfo.isAdmin && userInfo._id !== id) {
      return createError(
        "Authorization",
        "Only the own user or admin can delete this user",
        403,
      );
    }

    let user = await deleteUser(id);
    res.status(201).send(returnUser(user))
  } catch (error) {
    return handleError(res, 400, error.message);
  }
});


module.exports = router;
