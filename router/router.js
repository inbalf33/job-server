const express = require("express");
const jobRouter = require("../jobs/routes/jobRestControllers");
const userRouter = require("../users/router/userRestControllers");
const { handleError } = require("../utils/handleErrors");


const router = express.Router();

router.use("/jobs", jobRouter); // כל פנייה עם ג'ובס הוא ילך ל- jobRouter
router.use("/users", userRouter); // כל פנייה עם יוזרס הוא יילך לנתיב הזה - userRouter

// אם לא זה ילך לנתיב הזה
router.use((req, res) => {
    // res.status(404).send("Page not found");
    return handleError(res, 404, "Page not found");
}); 


module.exports = router;