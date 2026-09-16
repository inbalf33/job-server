const morgan = require('morgan');

const fs = require('fs');
const path = require('path');

const currentTime = require('../../utils/timeHelper');

// שמירת המיקום בו הלוגים יישמרו
const logDirectory = path.join(__dirname, "../../logs");

if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, {recursive: true});
}

const morganLogger = morgan(function (tokens, req, res) {
    const {year, month, day, hours, min, sec} = currentTime();

    // הגדרת שם הקובץ
    const fileName = `${day}-${month}-${year}`;
    const logFilePath = path.join(logDirectory, `${fileName}.log`)

    const message = [
        `[${day}/${month}/${year} ${hours}:${min}:${sec}]`,        
        tokens.method(req,res),
        tokens.url(req,res),
        tokens.status(req,res),
        " | ",
        tokens["response-time"](req,res),
        "ms ",       
    ].join(" ");

    const errorText = res.locals.errorMessage ? ` || ${res.locals.errorMessage}` : "";
    const plainText = message + errorText +  "\n" ;

    fs.appendFileSync(logFilePath,message)

    // if (res.statusCode >= 400) {
    // }

    return message;
});

module.exports = morganLogger;