const { stories } = require("../models")

class storiesController {

    static getAllStories(req, res, next) {
        stories.findAll({ order: [["id", "DESC"]] })
            .then(data => {
                res.status(200).json(data);
            })
            .catch(next)
    }

    static postStories(req, res, next) {
        let obj = {
            title: req.body.title,
            content: req.body.content,
            theme: req.body.theme,
            createdBy: req.body.createdBy,
            language: req.body.language
        }
        stories.create(obj)
            .then(data => {
                res.status(201).json(data);
            })
            .catch(next);
    }

    static detailStories(req, res, next) {

        let id = req.params.id
        stories.findOne({ where: { id } })
            .then(data => {
                if (data) {
                    res.status(200).json(data)
                } else {
                    res.status(404).json({ message: 'story not found' })
                }
            })
            .catch(next);
    }

}
module.exports = storiesController;