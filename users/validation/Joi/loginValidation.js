const Joi = require("joi");

const loginValidation = (user) => {
    const schema = Joi.object({
        email: Joi.string()
            .ruleset.regex(
                /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
            )
            .rule({ message: "Email must be a vaild email address" })
            .required(),
        password: Joi.string()
            .ruleset.regex(
                /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
            )
            .rule({
                message:
                    "Password must contain at least one uppercase letter, lowercase letter, number and one special charecter. The minimum length 7 charchters",
            })
            .required(),
    });

    return schema.validate(user);
};

module.exports = loginValidation;