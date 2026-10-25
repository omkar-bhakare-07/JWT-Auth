import "dotenv/config";

const PORT = process.env.PORT || 3005;
const JWT = {
    secret: process.env.JWT_SECRET,
    expiry: process.env.JWT_EXPIRES_IN || 862400
}
const MONGODB_URL = process.env.MONGODB_URL;

export {PORT, JWT, MONGODB_URL};