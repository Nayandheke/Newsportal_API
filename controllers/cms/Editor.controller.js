const { showError, validationError } = require("../../lib")
const { User } = require("../../models")
const bcrypt = require("bcryptjs")

class EditorController {
    index = async (req, res, next) => {
        try {
            const editors = await User.find({type : 'Editor'})
            res.json(editors)
        } catch(err) {
            showError(err, next)
        }
    }

    store = async (req, res, next) => {
        try {
            const { name, email, password, confirm_password, phone, address, status } = req.body;
    
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    
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
                    message: 'Password not confirmed.',
                    status: 422
                });
            }
    
            const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
            await User.create({ name, email, phone, address, password: hash, status, type: 'Editor' });
    
            res.status(201).json({
                success: 'Editor Created.',
            });
        } catch(err) {
            let message = {}
            if('errors' in err){
                for(let k in err.errors) {
                    message = {
                        ...message, [k]: err.errors[k].message
                    }
                }
            }
            else{
                if(err.message.startsWith('E11000')){
                    message = {
                        email: "Email already in use.",
                    }
                }
                else{
                    showError(err,next)
                }
            }
            next({
                message,
                status: 422
            })
        }
    }

    show = async(req,res,next) => {
        try{
            const editor = await User.findById(req.params.id)

            if(editor) {
                res.json(editor)
            } else {
                next({
                    message:'Editor not found',
                    status:404,
                })
            }
        } catch(err) {
            showError(err, next)
        }
    }

    update = async(req,res,next) => {
        try {
            const {name, phone, address, status} = req.body

            const editor = await User.findByIdAndUpdate(req.params.id, {name, phone, address, status })

            if(editor) {
                res.json({
                    success: 'Editor updated.'
                })       
            }
            else{
                next({
                    message: 'Editor not found',
                    status: 404
                })
            }     
        } catch (err) {
            let message = {}
            if('errors' in err){
                for(let k in err.errors) {
                    message = {
                        ...message, [k]: err.errors[k].message
                    }
                }
            }
            else{
                showError(err,next)
            }
            next({
                message,
                status: 422
            })
            
        }
    }

    destroy = async(req,res,next) => {
        try{
            const editor = await User.findByIdAndDelete(req.params.id)
            if(editor) {
                res.json({
                    success:'Editor removed.'
                })
            } else {
                next({
                    message:'Editor not found.',
                    status:404,
                })
            }
        } catch(err) {
            showError(err, next)
        }
    }
} 

module.exports = new EditorController