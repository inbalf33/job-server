const morganLogger = require("./morgan/morganLogger");

// const logger = "morgan";
const logger = process.env.LOGGER;

const loggerMiddleware = () => {
    if (logger === "morgan") {
        return morganLogger;
    }
    // ברירת מחדל במידה ואין לוגר מוגדר - ממשיך הלאה בלי לקרוס
    return (req, res, next) => next();
}

module.exports = loggerMiddleware;