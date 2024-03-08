const Signup = require("../Models/SignupModel");
const nodemailer = require('nodemailer');


const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key_here';

const transporter = nodemailer.createTransport({
    // Transport configuration
    service: 'gmail',
    auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_KEY
    }
});


exports.getsignuppage = (req, res) => {
    res.render('signup')
}


const bcrypt = require('bcrypt');

exports.postsignuppage = async (req, res) => {

    console.log("the request body", req.body.username);
    try {
        const { username, email, password } = req.body;

        // Generate a salt
        const salt = await bcrypt.genSalt(10);

        // Hash the password using the generated salt
        const passwordHash = await bcrypt.hash(password, salt);
        const user = new Signup({
            username: username,
            email: email,
            password: passwordHash // Store the hashed password
        });

        await user.save();


        const mailOptions = {
            from: "shaikrahul731@gmail.com",
            to: req.body.email,
            subject: 'Signup Confirmation',
            html: `<p>Welcome to our platform! Your signup was successful.</p>
            <p>Thank you for joining us. We're excited to have you as a part of our community.</p>
            <p>If you have any questions or need assistance, feel free to contact us.</p>
            <p>Best regards,</p>
            <p>F50@LOSERS PVT LIMITED</p>`
        };

        // Send the email
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error("Error sending email:", error);
                res.status(500).json({ message: "Error sending email" });
            } else {
                console.log('Email sent:', info.response);

            }
        });


        res.status(200).render('Signup', { message: "Signup successful and Confirmation SENT To ur EMAIL" });
    } catch (error) {
        // Handle errors appropriately
        console.error("Error in signup:", error);
        res.status(409).render('Signup', { message: "Already USED EMAIL " });

    }
}


exports.getlogin = (req, res) => {
    res.render('login')
}


exports.postlogin = async (req, res) => {

    try {
        const email = req.body.email
        const password = req.body.password
        const user = await Signup.findOne({ email: email })
        if (!user) {
            res.status(404).render('Login', { message: "No EMAIL WITH THIS PLEASE SIGNUP" });
        }

        const result = await bcrypt.compare(password, user.password);
        if (result) {
            console.log("Congratulations");
            const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '24h' });
            console.log("token:", token); // Log the token to ensure it's generated correctly
            res.cookie('token', token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.redirect('/profile');
        } else {
            res.status(401).render('Login', { message: "Please CHECK THE PASSWORD" });

        }
    } catch (error) {
        console.log(error);
        res.status(503).render('Login', { message: "Error While Logging SORRY FOR THIS PLEASE COME AFTER SOME TIME" });
    }
}


exports.getprofile = (req, res) => {
    const viewdata={
        userdetails:req.user,
    }
    console.log("the view detais",viewdata);
    res.render('dashboard',viewdata)
}

