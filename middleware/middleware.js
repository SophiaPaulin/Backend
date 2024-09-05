const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	const token = req.headers.authorization;
	if (token) {
		// const token = authHeader;
		jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
			if (err) return res.status(403).json({ status: false, message: "invalid token" });
			req.user = user;
			console.log({ user: req.user });
			next();
		});
	} else {
		return res.status(404).json({ status: false, message: "Token is missing" });
	}
};

module.exports = { verifyToken };
