const { showError } = require("../../lib")
const { Category } = require("../../models")

class ListController {
    categories = async (req, res, next) => {
        try {
            // Find categories with status 'Published'
            const categories = await Category.find({ status: 'Published' }).exec();
    
            // Return categories as JSON response
            res.json(categories);
        } catch (err) {
            // Handle errors by passing them to the next middleware
            showError(err, next);
        }
    };
    
    
    categoryById = async (req, res, next) => {}
}

module.exports = new ListController;