const { showError } = require("../../lib")
const { Category } = require("../../models")

class ListController {
    categories = async (req, res, next) => {
        try {
            const categories = await Category.find({ status: true }).exec();
    
            res.json(categories);
        } catch (err) {
            showError(err, next);
        }
    };
    
    
    categoryById = async (req, res, next) => {}
}

module.exports = new ListController;