const { createError, handleError } = require("../utils/handleErrors");
const { verifyToken } = require("./providers/jwt");

// const TOKEN_GENERATOR = "jwt";
const TOKEN_GENERATOR = process.env.TOKEN_GENERATOR;


// MIDDLEWARE

const auth = (req, res, next) => {
    if (TOKEN_GENERATOR === "jwt"){
        try {
            // לקיחת הטוקן מהלקוח
            const tokenFromClient = req.header("x-auth-token");
            // בדיקה האם אין טוקן בכלל
            if (!tokenFromClient){
                return createError("Authentication", "Please login", 401);
                // throw new Error("Authentication Error: Please login")
            }

            // אם יש טוקן זה יגיע לפה - וצריך לאמת אותו
            const userInfo = verifyToken(tokenFromClient);
            // במצב שפונקציית האימות מחזירה null
            if (!userInfo){ 
                return createError("Authentication", "Please login", 401);
                // throw new Error("Authentication Error: Unauthorize user")
            }

            // הוספת מאפיין חדש לאובייקט הבקשה - req
            req.user = userInfo;
            next();                        
        } catch (error) {
                return handleError(res, error.status, error.message)

            // return res.status(401).send(error.message);            
        }
    }
};

module.exports = auth;