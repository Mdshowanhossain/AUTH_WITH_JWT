const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        res.status(401).send('Unauthorized');
    }

    try {
        const decodedToken = jwt.verify(authHeader, process.env.JWT_SECRET);

        // console.log(decodedToken);

        req.userId = decodedToken.user._id
        next();

    } catch (err) {
        res.status(401).send('Unauthorized');
    }
}
