const cors = require("cors");

const corsmiddleware = cors({
    origin: [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "https://jobs-app-puce.vercel.app"
    ],
    allowedHeaders: ["Content-Type", "x-auth-token", "Authorization"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
});

module.exports = corsmiddleware;