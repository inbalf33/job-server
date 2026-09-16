const Joi = require("joi");
const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

const jobValidate = (job) => {
    const schema = Joi.object({
        title: Joi.string().min(2).max(256).required(),
        company: Joi.string().min(2).max(256).required(),
        description: Joi.string().min(2).max(1024).required(),
        category: Joi.string().min(2).max(256).required(),
        jobType: Joi.string().min(2).max(256).required(),
        experienceLevel: Joi.string().min(2).max(256).required(),
        location: Joi.string().min(2).max(256).required(),

        salary: Joi.object()
        .keys({
            min: Joi.number().min(0),
            max: Joi.number().min(0),
        })
        .required(),

        phone: Joi.string()
        .ruleset.regex(/^0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}$/)
        .rule({
            message: "Phone must be a valid Israeli phone number",
        }).required(),

        email: Joi.string().ruleset.regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
        .rule({message: "Email must be a valid email address"}).required(),

        applyLink: Joi.string().ruleset.regex(urlRegex)
        .rule({message: "Apply link be a valid url"}).allow(""),

        image: Joi.object()
        .keys({
            url: Joi.string().ruleset.regex(urlRegex)
        .rule({message: "Image URL must be a valid URL address"}),
            alt: Joi.string().max(256).allow(""),
        })
        .required(),

        jobNumber: Joi.number().min(1_000_000).max(9_999_999),
    });

    return schema.validate(job, {abortEarly: false});
};
module.exports = jobValidate;