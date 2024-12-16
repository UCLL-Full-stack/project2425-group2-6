"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJwtToken = ({ email, role }) => {
    const options = { issuer: "Renovy", expiresIn: `${process.env.JWT_EXPIRES_IN}h` };
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    try {
        return jsonwebtoken_1.default.sign({ email, role }, process.env.JWT_SECRET, options); // Pass an object payload
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error("Error generating JWT token: " + error.message);
        }
    }
    return "ENCOUNTERED ERROR AUTHENTICATING";
};
exports.default = generateJwtToken;
