const {stories} = require("../models")

class storiesController{

    static getAllStories(req,res){

        stories.findAll()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err=>{
            res.status(500).json({message: "internal server error"});
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
            if(err.name == 'SequelizeValidationError'){
                res.status(400).json({
                    message: err.errors[0].message
                });
            }else if(err.message){
                res.status(400).json({
                    message: err.message
                })
            }else{
                res.status(500).json({message: "internal server error"});
            }
        })
    }

    static detailStories(req,res){

        let id = req.params.id
        stories.findOne({where:{id}})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json({message: "internal server error"});
        })
    }

}
module.exports = storiesController;