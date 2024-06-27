const { showError, validationError } = require("../../lib")
const { Article } = require("../../models")
const bcrypt = require("bcryptjs")
const {unlinkSync} = require('node:fs')


class ArticlesController {
    index = async (req, res, next) => {
        try {
            const articles = await Article.aggregate([
                {$lookup:{from: 'categories', localField: 'categoryId', foreignField: '_id', as: 'category'}}
            ]).exec()

            let result = articles.map(article => {
                return{
                    id: article._id,
                    title: article.title,
                    author: article.author,
                    content: article.content,
                    description: article.description,
                    categoryId: article.categoryId,
                    latest: article.latest,
                    featured: article.featured,
                    status: article.status,
                    images: article.images,
                    createdAt: article.createdAt,
                    updatedAt: article.updatedAt,
                    categoryId: article.category[0],
                    __v : article.__v
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
    
            await Article.create({ title,author,content,description,categoryId,latest,featured, status, images });
    
            res.status(201).json({
                success: 'Articles Created.',
            });
        } catch(err) {
            validationError(err, next)
        }
    }

    show = async(req,res,next) => {
        try{
            const article = await Article.findById(req.params.id)

            if(article) {
                res.json(article)
            } else {
                next({
                    message:'Articles not found',
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

            let articles = await Article.findById(req.params.id)

            let images = [
                ...articles.images,
                ...req.files.map(file => file.filename)
            ]

            articles = await Article.findByIdAndUpdate(req.params.id,{title,author,content,description,categoryId,latest,featured, status, images})
            if(articles) {
                res.json({
                    success:'Article updated.'
                })
            } else {
                next({
                    message:'Article not found.',
                    status:404,
                })
            }
        } catch(err) {
            validationError(err, next)
        }
    }

    destroy = async(req,res,next) => {
        try{
            let article = await Article.findById(req.params.id)

            for(let image of article.images) {
                unlinkSync(`uploads/${image}`)
            }
            article = await Article.findByIdAndDelete(req.params.id)

            if(article) {
                res.json({
                    success:'Article removed.'
                })
            } else {
                next({
                    message:'Article not found.',
                    status:404,
                })
            }
        } catch(err) {
            showError(err, next)
        }
    }
} 

module.exports = new ArticlesController 