const { showError } = require("../../lib")
const { Article, Category } = require("../../models")

class ArticleController {
    latest = async (req, res, next) => {
        try {
            const articles =  await Article.find({latest: true}).sort({createdAt: 'desc'}).exec()

            res.json(articles)
            
        } catch (err) {
            showError(err, next)
            
        }
    }

    featured = async (req, res, next) => {
        try {
            const articles =  await Article.find({featured: true, featured: true}).exec()

            res.json(articles)
            
        } catch (err) {
            showError(err, next)
            
        }
    }

    byId = async (req,res,next) => {
        try{
            const article =  await Article.findOne({_id: req.params.id, status: true}).exec()
                if(article) {
                    const category = await Category.findById(article.categoryId)
                        res.json ({
                            _id: article._id,
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
                            __v : article.__v,
                            category
                        })
            } else {
                next({
                    Message: "Article not found.",
                    status: 404
                })
            }
 
        } catch(err) {
            showError(err, next)
        }
    }

    byCategoryId = async (req, res, next) => {
        try{
            const articles = await Article.find({categoryId: req.params.id, status: true}).exec()

            res.json(articles)

        } catch(err) {
            showError(err, next)
        }
    }

    similar = async (req, res, next) => {
        try {
            const article = await Article.findById(req.params.id).exec();
            
            if (!article) {
                return next({
                    message: "Article not found.",
                    status: 404
                });
            }
            
            const similarArticles = await Article.find({
                categoryId: article.categoryId,
                _id: { $ne: article._id }
            })
            .sort({ createdAt: 'desc' }) 
            .limit(5) 
            .exec();
    
            res.json(similarArticles);
        } catch (err) {
            showError(err, next);
        }
    };

    search = async (req, res, next) => {
        try {
            const articles =  await Article.aggregate([
                {$match : {status: true, title: {$regex: req.query.term,
                $options: 'i'}}}
            ]).exec()
            res.json(articles)
            
        } catch (err) {
            showError(err, next)
        }
    }
}

module.exports = new ArticleController;