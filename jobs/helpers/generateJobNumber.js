const _ = require("lodash");
const Job = require("../models/mongodb/Job");
const { createError } = require("../../utils/handleErrors");

const generateJobNumber = async () => {
    // מספר המשרות
    let jobCount = Job.countDocuments();
    if (jobCount === 8_999_999){
        // throw new Error("The app eached to the Maximun jobs count");
        return createError("Mongoose", "The app eached to the Maximun jobs count", 409);
    }

    let random;

    do {
        random = _.random(1_000_000, 9_999_999);
    } while (await isJobNumberExist(random));
    // כל עוד בוייל היא מקבלת אמת - זה יעשה שוב את ה- דו

    return random;
};

// פונק' שבודקת האם קיים כבר מספר רנדומלי כזה כמו שקיבלה
const isJobNumberExist = async (jobNumnber) => {
    try {
        const jobWidthThisJobNumber = await Job.findOne({ jobNumnber })
        return Boolean(jobWidthThisJobNumber);
    } catch (error) {
        // throw new Error("Mongoose: " + error.message);  
        return createError("Mongoose", error.message, 500);

    }
};

module.exports = generateJobNumber;

