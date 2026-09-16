const mongoose = require("mongoose");
const Name = require("../../../helpers/mongodb/Name");
const { PHONE, EMAIL } = require("../../../helpers/mongodb/mongooseValidators");
const Images = require("../../../helpers/mongodb/Images");
const Address = require("../../../helpers/mongodb/Address");


const userSchema = new mongoose.Schema({
    name: Name,
    phone: PHONE,
    email: EMAIL,
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        maxLength: 256,
    },
    image: Images,
    address: Address,
    isRecruiter: {
    type: Boolean,
    default: false,
    required: true,
    },
    isAdmin: {
    type: Boolean,
    default: false,
    },
});


// שם המודל
const User = mongoose.model("User", userSchema);

// ייצוא המודל
module.exports = User;