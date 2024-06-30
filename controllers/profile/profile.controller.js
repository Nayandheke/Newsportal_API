const { default: mongoose } = require("mongoose")
const { showError } = require("../../lib")
const { User} = require('../../models')
const bcrypt = require('bcryptjs')

class ProfilesController { 
    details = async (req, res, next) => {
        res.json(req.user)
    }

    profile = async (req, res, next) => {
        try {
            const { name, phone, address } = req.body

            const user = await User.findByIdAndUpdate(req.user._id, { name, phone, address })

            if (user) {
                res.json({
                    success: 'Profile updated.'
                })
            }
            else {
                next({
                    message: 'Profile not found',
                    status: 404
                })
            }
        } catch (err) {
            let message = {}
            if ('errors' in err) {
                for (let k in err.errors) {
                    message = {
                        ...message, [k]: err.errors[k].message
                    }
                }
            }
            else {
                showError(err, next)
            }
            next({
                message,
                status: 422
            })

        }
    }

    password = async (req, res, next) => {
        try {
            const { oldPassword, newPassword, confirmPassword } = req.body

            if (bcrypt.compareSync(oldPassword, req.user.password)) {
                if (newPassword == confirmPassword) {

                    const hash = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10))

                    const user = await User.findByIdAndUpdate(req.user._id, { password: hash })

                    if (user) {
                        res.json({
                            success: 'Password updated.'
                        })
                    }
                    else {
                        next({
                            message: 'Profile not found',
                            status: 404
                        })
                    }

                }
                else {
                    next({
                        message: 'password not confirmed',
                        status: 404
                    })
                }
            }
            else {
                next({
                    message: 'Old Password is incorrect.',
                    status: 422
                })
            }
        } catch (err) {
            let message = {}
            if ('errors' in err) {
                for (let k in err.errors) {
                    message = {
                        ...message, [k]: err.errors[k].message
                    }
                }
            }
            else {
                showError(err, next)
            }
            next({
                message,
                status: 422
            })

        }
    }


}

module.exports = new ProfilesController