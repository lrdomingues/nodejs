const Post = require('../Models/Post')

module.exports = {
    async getReport(req, res){
        try {
            const allPost = await Post.find()

            const data = allPost.map(function(v, i){
                const arr = {
                    id: v._id,
                    title: v.title,
                    comments: v.comments.length,
                    views: null,
                    likes: v.likes.length,
                    dislikes: v.dislikes.length
                }

                return arr
            })

            return res.status(200).send({
                message: 'Posts Report',
                data
            })
        } catch(err) {
            return res.status(400).send(err)
        }
    }
}