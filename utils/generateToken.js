import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

	res.cookie("chat-user", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // MS
		httpOnly: false, 
		sameSite: "none", // CSRF attacks cross-site request forgery attacks
		secure: process.env.NODE_ENV === "production",
		secure: true,
	});
};

export default generateTokenAndSetCookie;
