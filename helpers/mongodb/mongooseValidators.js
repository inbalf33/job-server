const DEFAULT_VALIDATION = {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 256,
    trim: true,
    lowercase: true,    
}

const PHONE = {
    type: String,
    required: true,
    match: RegExp(/^(?=(?:\D*\d){9,11}$)0\d{1,2}-?\d{7}$/),
}

const EMAIL = {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
    match: RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)
};

const URL = {
    type: String,
    required: true,
    lowercase: true,
    match: RegExp(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/),
}

module.exports = { DEFAULT_VALIDATION, PHONE, EMAIL, URL };
