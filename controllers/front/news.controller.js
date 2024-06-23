const { showError } = require("../../lib")
const { News } = require("../../models")

class NewsController {
    latest = async (req, res, next) => {
        try {
            const news =  await News.find({latest: true}).sort({createdAt: 'desc'}).exec()

            res.json(news)
            
        } catch (err) {
            showError(err, next)
            
        }
    }

    featured = async (req, res, next) => {
        try {
            const news =  await News.find({featured: true, featured: true}).exec()

            res.json(news)
            
        } catch (err) {
            showError(err, next)
            
        }
    }

    byCategoryId = async (req, res, next) => {}

    similar = async (req, res, next) => {}

    search = async (req, res, next) => {}
}

module.exports = new NewsController;