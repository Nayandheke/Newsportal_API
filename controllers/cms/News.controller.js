const { showError, validationError } = require("../../lib")
const { News } = require("../../models")
const bcrypt = require("bcryptjs")
const {unlinkSync} = require('node:fs')


class NewsController {
    index = async (req, res, next) => {
        try {
            const news = await News.find()

            res.json(news)
        } catch(err) {
            showError(err, next)
        }
    }

    store = async (req, res, next) => {
        try {
            const { title,author,content,description,categoryId,featured, status } = req.body;

            let images = req.files.map(file => file.filename)
    
            await News.create({ title,author,content,description,categoryId,featured, status, images });
    
            res.status(201).json({
                success: 'News Created.',
            });
        } catch(err) {
            validationError(err, next)
        }
    }

    show = async(req,res,next) => {
        try{
            const news = await News.findById(req.params.id)

            if(news) {
                res.json(news)
            } else {
                next({
                    message:'News not found',
                    status:404,
                })
            }
        } catch(err) {
            showError(err, next)
        }
    }

    update = async(req,res,next) => {
        try{
            const {title,author,content,description,categoryId,featured, status} = req.body

            let news = await News.findById(req.params.id)

            let images = [
                ...news.images,
                ...req.files.map(file => file.filename)
            ]

            news = await News.findByIdAndUpdate(req.params.id,{title,author,content,description,categoryId,featured, status, images})
            if(news) {
                res.json({
                    success:'News updated.'
                })
            } else {
                next({
                    message:'News not found.',
                    status:404,
                })
            }
        } catch(err) {
            validationError(err, next)
        }
    }

    destroy = async(req,res,next) => {
        try{
            let news = await News.findById(req.params.id)

            for(let image of news.images) {
                unlinkSync(`uploads/${image}`)
            }
            news = await News.findByIdAndDelete(req.params.id)

            if(news) {
                res.json({
                    success:'News removed.'
                })
            } else {
                next({
                    message:'News not found.',
                    status:404,
                })
            }
        } catch(err) {
            showError(err, next)
        }
    }
} 

module.exports = new NewsController