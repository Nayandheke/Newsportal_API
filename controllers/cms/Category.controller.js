const { showError, validationError } = require("../../lib")
const { Category } = require("../../models")
const bcrypt = require("bcryptjs")


class CategoryController {
    index = async (req, res, next) => {
        try {
            const categories = await Category.find()

            res.json(categories)
        } catch(err) {
            showError(err, next)
        }
    }

    store = async (req, res, next) => {
        try {
            const { name, status } = req.body;
    
            // Create a new Category document with name and status
            const newCategory = new Category({ name, status });
            await newCategory.save();
    
            res.status(201).json({
                success: 'Category Created.',
                category: newCategory, // Optionally, send back the created category
            });
        } catch(err) {
            // Handle validation errors or other errors
            validationError(err, next);
        }
    };

    show = async(req,res,next) => {
        try{
            const category = await Category.findById(req.params.id)

            if(category) {
                res.json(category)
            } else {
                next({
                    message:'Category not found',
                    status:404,
                })
            }
        } catch(err) {
            showError(err, next)
        }
    }

    update = async(req,res,next) => {
        try{
            const {name, status} = req.body

            const category = await Category.findByIdAndUpdate(req.params.id,{name,  status})
            if(category) {
                res.json({
                    success:'Category updated.'
                })
            } else {
                next({
                    message:'Category not found.',
                    status:404,
                })
            }
        } catch(err) {
            validationError(err, next)
        }
    }

    destroy = async(req,res,next) => {
        try{
            const category = await Category.findByIdAndDelete(req.params.id)
            if(category) {
                res.json({
                    success:'Category removed.'
                })
            } else {
                next({
                    message:'Category not found.',
                    status:404,
                })
            }
        } catch(err) {
            showError(err, next)
        }
    }
} 

module.exports = new CategoryController