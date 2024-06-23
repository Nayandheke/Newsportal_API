const { showError, validationError } = require("../../lib")
const { News } = require("../../models")
const bcrypt = require("bcryptjs")
const {unlinkSync} = require('node:fs')


class NewsController {
    index = async (req, res, next) => {
        try {
            const news = await News.aggregate([
                {$lookup:{from: 'categories', localField: 'categoryId', foreignField: '_id', as: 'category'}}
            ]).exec()

            let result = news.map(news => {
                return{
                    id: news._id,
                    title: news.title,
                    author: news.author,
                    content: news.content,
                    description: news.description,
                    categoryId: news.categoryId,
                    latest: news.latest,
                    featured: news.featured,
                    status: news.status,
                    images: news.images,
                    createdAt: news.createdAt,
                    updatedAt: news.updatedAt,
                    categoryId: news.category[0],
                    __v : news.__v
                }
            })
            res.json(result)
        } catch(err) {
            showError(err, next)
        }
    }

    store = async (req, res, next) => {
        try {
            const { title,author,content,description,categoryId,latest,featured, status } = req.body;

            let images = req.files.map(file => file.filename)
    
            await News.create({ title,author,content,description,categoryId,latest,featured, status, images });
    
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
            const {title,author,content,description,categoryId,latest,featured, status} = req.body

            let news = await News.findById(req.params.id)

            let images = [
                ...news.images,
                ...req.files.map(file => file.filename)
            ]

            news = await News.findByIdAndUpdate(req.params.id,{title,author,content,description,categoryId,latest,featured, status, images})
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