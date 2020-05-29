const {stories} = require("../models")

class storiesController{

    static getAllStories(req,res){

        stories.findAll()
        .then(data=>{
            res.status(201).json(data);
        })
        .catch(err=>{
            res.status(404).json(err);
        })
    }

    static postStories(req,res){

        let obj = {
            title:req.body.title,
            content:req.body.content,
            theme:req.body.theme,
            createdBy:req.body.createdBy
        }
            
        stories.create(obj)
        .then(data=>{
            res.status(201).json(data);
        })
        .catch(err=>{
            res.status(500).json("internal server error");
        })
    }

    static detailStories(req,res){

        let id = req.params.id
        stories.findOne({where:{id}})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(404).json(err)
        })
    }

}
module.exports = storiesController;