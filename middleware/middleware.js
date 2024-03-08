const jwt = require('jsonwebtoken');
const Signup = require('../Models/SignupModel');
const secretKey = 'your_secret_key_here';

exports.authenticate = async (req, res, next) => {
    console.log("IN MIDDLE WARE");
    const token = req.cookies.token;
    console.log('Token value:', token);

    try {
        const user = jwt.verify(token, secretKey);
        console.log("USERID>>>>>", user.userId);

        // Find the user by user ID
        const foundUser = await Signup.findById(user.userId)
        console.log("FOUND USER",foundUser);
    
        if (foundUser) {
            req.user = foundUser; // Set the user in the request object
            console.log("INTO THE USER ID");
            next(); // Proceed to the next middleware
        } else {
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(401).send({ message: 'You are not authorized to perform this action' });
    }
}
