// const Joi = require("joi");
const validator = "Joi";

const registerValidation = require("./registerValidation");
const loginValidation = require("./loginValidation");
const editUserValidation = require("./editUserValidation"); 


const validateRegister = (user) => {
    if (validator === "Joi") {
        const {error} = registerValidation(user)
        if (error) {
            return error.details.map((detail) => detail.message);
        }
        return "";
    }
};

const validateLogin = (user) => {
    if (validator ==="Joi") {
        const {error} = loginValidation(user);
        if (error) {
            return error.details.map((detail) => detail.message);
        }
        return "";
    }

}

const validateEditUser = (user) => {
    if (validator === "Joi") {
        const { error } = editUserValidation(user);
        if (error) {
            return error.details.map((detail) => detail.message);
        }
        return "";
    }
};

module.exports = {validateRegister, validateLogin, validateEditUser};