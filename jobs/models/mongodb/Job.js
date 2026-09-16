const mongoose = require("mongoose");
const { DEFAULT_VALIDATION, PHONE, EMAIL, URL } = require("../../../helpers/mongodb/mongooseValidators");
const Images = require("../../../helpers/mongodb/Images");

const jobSchema = new mongoose.Schema({
    title: DEFAULT_VALIDATION,
    company: DEFAULT_VALIDATION,
    description: { ...DEFAULT_VALIDATION, maxLength: 1024 },
    category: DEFAULT_VALIDATION,
    jobType: DEFAULT_VALIDATION,
    experienceLevel: DEFAULT_VALIDATION,
    location: DEFAULT_VALIDATION,
    
    // אובייקט השכר נסגר כאן בנפרד!
    salary: {
        min: {
            type: Number,
            min: 0,
            default: 0,
        },
        max: {
            type: Number,
            min: 0,
            default: 0,
        },
    },

    // שאר השדות של המשרה - מחוץ ל-salary
    phone: PHONE,
    email: {...EMAIL, uniqe:false},
    applyLink: URL,
    image: Images, // וודא שקובץ Images.js מייצא רק Schema ולא mongoose.model
    jobNumber: {
        type: Number,
        required: true,
        min: 1000000,
        max: 9999999,
    },
    savedBy: [String],
    createdAt: { // תוקן גם מ-createAt ל-createdAt הנפוץ
        type: Date,
        default: Date.now, // ללא סוגריים בסוף כדי שייקח את הזמן הרגע של היצירה
    },
    recruiter_id: {
        type: mongoose.Schema.Types.ObjectId, // תוקן מ-ObjsctID ל-ObjectId
        required: true,
    },
});

// שם המודל
const Job = mongoose.model("Job", jobSchema);

// ייצוא המודל
module.exports = Job;