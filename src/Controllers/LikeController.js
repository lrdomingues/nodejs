const Post = require('../Models/Post')

module.exports = {
    async likePost(req,res){
        const { post_id } = req.params
        const { user_id } = req.headers

        try {
            const likedPost = await Post.findById(post_id)
            if(!likedPost) return res.status(400).send({message: "Post does not exist"})

            if(likedPost.likes.includes(user_id)) return res.status(400).send({
                message: "Post already liked"
            })

            likedPost.dislikes.pull(user_id)
            likedPost.likes.push(user_id)
            await likedPost.save()

            return res.status(200).send({
                message: "Post liked",
                data: likedPost
            })
        } catch(err) {
            return res.status(400).send(err)
        }
    },
    async dislikePost(req,res){
        const { post_id } = req.params
        const { user_id } = req.headers

        try {
            const dislikedPost = await Post.findById(post_id)
            if(!dislikedPost) return res.status(400).send({message: "Post does not exist"})

            if(dislikedPost.dislikes.includes(user_id)) return res.status(400).send({
                message: "Post already disliked"
            })

            dislikedPost.likes.pull(user_id)
            dislikedPost.dislikes.push(user_id)
            await dislikedPost.save()

            return res.status(200).send({
                message: "Post disliked",
                data: dislikedPost
            })
        } catch(err) {
            return res.status(400).send(err)
        }
    }
}