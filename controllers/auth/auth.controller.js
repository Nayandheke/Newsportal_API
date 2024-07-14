const { showError } = require("../../lib")
const { User } = require("../../models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

class AuthController {
    register = async (req, res, next) => {
        try {
            const { name, email, password, confirm_password, phone, address } = req.body;
    
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            const phoneRegex = /^98\d{8}$/;
    
            if (!emailRegex.test(email)) {
                return next({
                    message: 'Invalid email format.',
                    status: 422
                });
            }
    
            if (!passwordRegex.test(password)) {
                return next({
                    message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.',
                    status: 422
                });
            }
    
            if (password !== confirm_password) {
                return next({
                    message: 'Password confirmation does not match.',
                    status: 422
                });
            }
    
            if (!phoneRegex.test(phone)) {
                return next({
                    message: 'Phone number must be exactly 10 digits and start with 98.',
                    status: 422
                });
            }
    
            const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    
            await User.create({ name, email, phone, address, password: hash });
    
            res.status(201).json({
                success: 'Thank you for registering. Please log in to access your account.',
            });
        } catch (err) {
            let message = {};
            if (err.name === 'ValidationError' && 'errors' in err) {
                for (let k in err.errors) {
                    message = {
                        ...message, [k]: err.errors[k].message
                    };
                }
            } else if (err.code === 11000) {
                message = {
                    email: 'Email already in use.',
                };
            } else {
                message = {
                    error: 'Something went wrong. Please try again.'
                };
            }
    
            next({
                message,
                status: 422
            });
        }
    };
    
    
    
    

    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
    
            if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                    if (user.status) {
                        const token = jwt.sign({
                            id: user._id,
                            iat: Math.floor(Date.now() / 1000),
                            exp: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60)
                        }, process.env.JWT_SECRET);
    
                        res.json({
                            token,
                            user
                        });
                    } else {
                        next({
                            message: 'Inactive user.',
                            status: 403
                        });
                    }
                } else {
                    next({
                        message: 'Incorrect password.',
                        status: 422
                    });
                }
            } else {
                next({
                    message: 'Incorrect email',
                    status: 422
                });
            }
        } catch (err) {
            showError(err, next);
        }
    };
    
}

module.exports = new AuthController