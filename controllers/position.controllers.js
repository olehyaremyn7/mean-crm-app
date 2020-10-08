const error = require('../utils/error-handler.utils');
const Position = require('../models/Position');

module.exports.getByCategoryIdController = async (req, res) => {
    try {

        const position = await Position.find({
            category: req.params.categoryId,
            user: req.user.id
        });

        res.status(200).json(position);

    } catch (e) {
        error(res, e);
    }
};

module.exports.createController = async (req, res) => {
    try {

        const { name, cost, category } = req.body;
        const position = new Position({
            name,
            cost,
            category,
            user: req.user.id

        });

        await position.save();

        res.status(201).json({ message: 'New position was successfully created', position });

    } catch (e) {
        error(res, e);
    }
};

module.exports.removeController = async (req, res) => {
    try {

        await Position.remove({ _id: req.params.id });
        res.status(200).json({ message: 'Position has been deleted' });

    } catch (e) {
        error(res, e);
    }
};

module.exports.updateController = async (req, res) => {
    try {

        const position = await Position.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
        );

        res.status(200).json({ message: 'Position was successfully updated', position });

    } catch (e) {
        error(res, e);
    }
};
