const Post = require('../Models/Post')

module.exports = {
    async createPost(req, res){
        const {
            title,
            description,
            picture
        } = req.body

        const { user_id } = req.headers

        try{
            const newPost = await Post.create({
                title,
                description,
                picture,
                user_id
            })

            return res.status(200).send({
                message: "Post created successfully",
                data: newPost
            })
        } catch(err) {
            return res.status(400).send(err)
        }
    },

    async listAllPosts(req, res){
        try {
            const allPosts = await Post.find().populate('user_id')
            
            return res.status(200).send({
                message: "All posts found",
                data: allPosts
            })
        } catch(err) {
            return res.status(400).send(err)
        }
    },

    async deletePost(req, res){
        const { post_id } = req.params
        const { user_id } = req.headers

        try {
            const postExists = await Post.findById(post_id)
            if(!postExists) return res.status(400).send({ message: "Post does not exist" })

            const belongsToUser = await Post.findOne({ user_id }).where({ _id: post_id })
            if(!belongsToUser) return res.status(400).send({ message: "Operation not allowed" })

            const deletePost = await Post.findByIdAndDelete(post_id)
            
            return res.status(200).send({
                message: "Deleted post successfully",
                data: deletePost
            })
        } catch(err) {
            return res.status(400).send(err)
        }
    },

    async editPost(req, res){
        const { post_id } = req.params
        const {
            title,
            description,
            picture
        } = req.body
        const { user_id } = req.headers

        try {
            const postExists = await Post.findById(post_id)
            if(!postExists) return res.status(400).send({ message: "Post does not exist" })

            const belongsToUser = await Post.findOne({ user_id }).where({ _id: post_id })
            if(!belongsToUser) return res.status(400).send({ message: "Operation not allowed" })

            const editPost = await Post.findByIdAndUpdate(post_id, {
                title,
                description,
                picture
            }, {
                new: true
            })

            return res.status(200).send({
                message: "Updated successfully",
                data: editPost
            })
        } catch(err) {
            return res.status(400).send(err)
        }
    }
}