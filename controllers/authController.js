const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users.model");

module.exports.createUser = async (req, res) => {
	let user = await User.findOne({ email: req.body.email });
	if (user) {
		return res.status(400).send("User already exisits. Please sign in");
	} else {
		try {
			const salt = await bcrypt.genSalt(10);
			const password = await bcrypt.hash(req.body.password, salt);
			const user = new User({
				name: req.body.name,
				email: req.body.email,
				password: password,
			});
			await user.save();
			return res.status(201).json({
				user,
				success: true,
				userId: user._id,
				message: "Registered successfully!",
			});
		} catch (err) {
			return res.status(400).json({ message: err.message });
		}
	}
};

module.exports.loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		const userData = await User.findOne({
			email,
		});

		bcrypt.compare(password, userData.password).then((valid) => {
			if (valid) {
				var token = jwt.sign(
					{
						_id: userData._id,
						role: "basic",
					},
					process.env.SECRET_KEY,
					{
						expiresIn: "21d",
					},
				);
				return res.status(200).json({
					success: true,
					message: "Login Successfull",
					userId: userData._id,
					token,
					name: userData.name,
				});
			} else {
				return res.status(401).json({
					success: false,
					message: "Invalid username or password",
				});
			}
		});
	} catch (error) {}
};

// module.exports.registerUser = async (req, res) => {
// try {
//     const userExists = User.findOne({email: req.body.email});
// console.log({userExists})

// 		bcrypt.hash(req.body.password, 10, async (err, hash) => {
// 			if (err) return res.status(500).json({ error: "Something went wrong!" });
// 			if (hash) {
// 				const newUser = {
// 					name: req.body.name || null,
// 					email: req.body.email,
// 					password: hash,
// 					isAdmin: req.body.isAdmin || true,
// 					isSuperAdmin: req.body.isSuperAdmin || false,
// 				};
// 				const response = await User.create(newUser);
// 				return res.status(201).json({
// 					message: "User created successfully",
// 					result: response,
// 					status: true,
// 				});
// 			} else {
// 				return res.status(201).json({
// 					message: "User not created",
// 					status: false,
// 				});
// 			}
// 		});
// 	} catch (error) {
// 		return res.status(500).json({
// 			status: false,
// 			message: "Internal server error!",
// 		});
// 	}
// };
