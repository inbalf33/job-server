const createError = (validator, message, status = 400) => {
    const messageText = String(message);
    const fullMessage = messageText.includes("Error:") 
    ? messageText 
    : `${validator} Error: ${messageText}`;

    const error = new Error(fullMessage);
    error.status = status;
    throw error;
};

const handleError = (res, status = 500, message = "Internal Server Error") => {
    res.locals.errorMessage = message;
    // console.log(message);
    return res.status(status).send(message);    
};

module.exports = { createError, handleError };