import jwt from 'jsonwebtoken';

const secretKeys = {
    admin: 'LGOINTOKENJABER',
    owner: 'LGOINTOKENJABER99',
    renter: 'LGOINTOKENJABER100',
    delivery: 'LGOINTOKENJABER101'
};

function verifyToken(req, res, next) {
    const token = req.headers.token;
    if (token) {
        try {
            const payload = jwt.decode(token);
            if (!payload || !payload.userType || !secretKeys[payload.userType]) {
                return res.status(400).json({ message: ' Invalid user type or invalid token' });
            }
            jwt.verify(token, secretKeys[payload.userType], (err, decoded) => {

                if (err) {
                    return res.status(401).json({ message: 'Invalid token' });
                }
                req.user = decoded;
                next();
            });

        } catch (error) {
            console.error('Token verification error: ',error)
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