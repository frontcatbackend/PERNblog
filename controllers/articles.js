const {Article} = require('../models/models')

class ActicleController{
    async createArticle(req, res){
        const {title, description} = req.body
         await Article.create({
            title, description
        }).then(createdArticle=>{
            res.json(createdArticle)
        })
    }

    async deleteArticle(req, res){
        const {id} = req.params
        await Article.destroy(
            {
                where: {id},

            }
        ).then(deletedArticle=>{
            res.json(deletedArticle)
        })
    }

    async getAllArticles(req, res){
        await Article.findAll().then(findedArticles=>{
            res.json(findedArticles)
        })
    }

    async getOneArticle(req, res){
        const {id} = req.params
        await Article.findOne({
            where: {id}
        }).then(get=>{
            res.json(get)
        })
    }

    async updateArticle(req, res){
        const {id} = req.params
        const{title, description} = req.body

        await Article.update({
            title, description
        },
        {
            where:{id:id}
        })

        let updatedArticle = await Article.findByPk(id)
        return res.json(updatedArticle)
    }
}

module.exports = new ActicleController