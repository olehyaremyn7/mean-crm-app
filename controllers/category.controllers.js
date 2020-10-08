const error = require('../utils/error-handler.utils');
const Category = require('../models/Category');
const Position = require('../models/Position');

module.exports.getAllController = async (req, res) => {
    try {

        const categories = await Category.find({ user: req.user.id });
        res.status(200).json(categories);

    } catch (e) {
        error(res, e);
    }
};

module.exports.getByIdController = async (req, res) => {
    try {

        const category = await Category.findById(req.params.id);
        res.status(200).json(category);

    } catch (e) {
        error(res, e);
    }
};

module.exports.removeController = async (req, res) => {
    try {

        await Category.remove({ _id: req.params.id });
        await Position.remove({ category: req.params.id });

        res.status(200).json({ message: 'Category has been deleted' });

    } catch (e) {
        error(res, e);
    }
};

module.exports.createController = async (req, res) => {
    try {

        const category = new Category({
            name: req.body.name,
            user: req.user.id,
            imagePath: req.file ? req.file.path : ''
        });

        await category.save();

        res.status(201).json({ message: 'New category was successfully created', category });

    } catch (e) {
        error(res, e);
    }
};

module.exports.updateController = async (req, res) => {
    try {

        const updated = { name: req.body.name };

        if (req.file) {
            updated.imagePath = req.file.path
        }

        const category = await Category.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updated },
            { new: true }
        );

        res.status(200).json({ message: 'Category was successfully updated', category });

    } catch (e) {
        error(res, e);
    }
};
