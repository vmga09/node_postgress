import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json("Token is not valid");
            }
            req.user = user.email;
            req.role = user.rid;
            next();
        });

    } else {
        return res.status(401).json("You are not authenticated");
    }
}

const isAdmin = (req, res, next) => {
    if (req.role === 1) {
        next();
    } else {
        return res.status(403).json("You are not admin");
    }
}

const isVet = (req, res, next) => {
    if (req.role === 2 || req.role === 1) {
        next();
    } else {
        return res.status(403).json("You are not authorized");
    }
}


export { verifyToken, isAdmin, isVet };
