const jobValidate = require("./joi/jobValidate");

const validator = process.env.VALIDATOR;

const jobValidation = (job) => {
  if (validator === "Joi") {
    const { error } = jobValidate(job);
    if (error) return error.details.map((detail) => detail.message).join(", ");
    return "";
  }
  return ""; 
};

module.exports = jobValidation;