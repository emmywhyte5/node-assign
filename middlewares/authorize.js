import e from 'express';
import jwt from 'jsonwebtoken';

const authorize = (allowedRoles) => (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided, please log in" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;

        // Check if the user's role is allowed
        if (!allowedRoles.includes(decoded.role)) {
            return res.status(403).json({ message: "Forbidden: You do not have permission to access this resource" });
        }

        next();
        
    } catch (error) {
        console.log("Token verification error: ", error.message);
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired. Please log in again." });
        }
        return res.status(401).json({ message: "Invalid token. Please log in again." });
    }
}


export default authorize;