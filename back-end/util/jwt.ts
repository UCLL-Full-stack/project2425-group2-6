import jwt from 'jsonwebtoken';

const generateJwtToken = ({ email, role }: any): string => {
    const options = { issuer: "Renovy", expiresIn: `${process.env.JWT_EXPIRES_IN}h` };

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }

    try {
        return jwt.sign({ email, role }, process.env.JWT_SECRET, options); // Pass an object payload
    } catch (error) {
        if (error instanceof Error) {
            throw new Error("Error generating JWT token: " + error.message);
        }
    }
    return "ENCOUNTERED ERROR AUTHENTICATING";
};

export default  generateJwtToken;