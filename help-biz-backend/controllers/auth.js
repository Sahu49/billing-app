const bcrypt = require("bcryptjs")
const User = require("../models/user")
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv")
dotenv.config()
exports.singUpHandler = (req, res) => {
    //extracting plain password from body of the request
    const plainPassword = req.body.password
    //using bcrypt hashing the password
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(plainPassword, salt, function (err, hash) {
            const newUser = new User(req.body)
            //here we are changing the plain password to hashed one
            newUser.password = hash
            //saving users data to the database
            newUser.save((err, user) => {
                if (err) {
                    return res.status(400).json({
                        error: "unable to save your data to the database"
                    })
                }
                return res.status(200).json(user)
            })
        });
    });


}

exports.signInHandler = (req, res) => {
    const email = req.body.email;
    User.findOne({ email }, (err, user) => {
        if (err && !user) {
            return res.status(404).json({
                error: "there is no user with this email"
            })
        }
        else {
            const password = req.body.password
            bcrypt.compare(password, user.password, (err, success) => {
                if (err) {
                    return res.status(400).json({
                        error: "something went wrong"
                    })
                }
                if (success) {
                    const token = jwt
                        .sign(
                            { _id: user._id, email: user.email },
                            toString(process.env.PRIVATE_KEY)
                        );
                    return res.status(200).json({
                        user,
                        token,
                        error: null
                    })
                }
                else {
                    return res.status(400).json({
                        error: "incorrect password/email"
                    })
                }
            })
        }
    })
}
//middleware to check user is authenticated or not
exports.isAuthenticated = async (req, res, next) => {
    const authHeader = await req.headers.authorization

    //here extract the token
    const token = await authHeader.split(" ")[1].toString();
    // console.log(token)
    jwt.verify(token, toString(process.env.PRIVATE_KEY), function (err, decoded) {
        if (err) {
            return res.status(500).json({
                error: "access denied1"
            })
        }
        // console.log(decoded) // bar
        req.auth = decoded

        next()
    });

}
exports.isSignedIn = (req, res, next) => {
    console.log(req.profile._id.toString())

    const idFromProfile = req.profile._id.toString()
    if (idFromProfile == req.auth._id) {
        next();
    }
    else {
        return res.status(500).json({
            error: "token missmatched"
        })
    }
}
