import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
    const token = req.headers.token;
    if (token) {
        try {
            const decode = jwt.verify(token, 'LGOINTOKENJABER99');
            req.user = decode;
            next();

        } catch (error) {
            res.status(401).json({ message: 'invalid token' });
        }
    } else {
        res.status(401).json({ message: 'no token provided' });
    }
}

function verifyTokenAndOwner(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.userType === 'owner' || req.user.userType === 'admin') {
            next();
        } else {
            return res.status(403).json({ message: ' you are not allowed ' })
        }
    });
}

function verifyTokenAndAdmin(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.userType === 'admin') {
            next();
        } else {
            return res.status(403).json({ message: ' you are not allowed ' })
        }
    });
}

function verifyTokenAndRenter(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.userType === 'renter' || req.user.userType === 'admin') {
            next();
        } else {
            return res.status(403).json({ message: ' you are not allowed ' })
        }
    });
}

function verifyTokenAndDelivery(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.userType === 'delivery' || req.user.userType === 'admin') {
            next();
        } else {
            return res.status(403).json({ message: ' you are not allowed ' })
        }
    });
}

export default {
    verifyToken,
    verifyTokenAndOwner,
    verifyTokenAndAdmin,
    verifyTokenAndRenter,
    verifyTokenAndDelivery,
};