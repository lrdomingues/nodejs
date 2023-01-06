const Comment = require('../Models/Comment')
const Post = require('../Models/Post')
const NotifyByEmail = require('../Utils/NotifyByEmail')

module.exports = {
    async createComment(req, res){
        const {
            description
        } = req.body

        const { 
            user_id,
            post_id 
        } = req.headers

        try{
            const newComment = await Comment.create({
                user_id,
                post_id,
                description
            })

            const commentPost = await Post.findById(post_id)
            commentPost.comments.push(user_id)
            await commentPost.save()

            if(newComment._id){
                NotifyByEmail(user_id)
            }

            return res.status(200).send({
                message: "Comment created successfully",
                data: newComment
            })
        } catch(err) {
            return res.status(400).send(err)
        }
    },

    async listAllComments(req, res){
        try {
            const allComments = await Comment.find().populate('post_id')

            return res.status(200).send({
                message: "Comments",
                data: allComments
            })
        } catch(err) {
            return res.status(400).send(err)
        }
    },

    async deleteComment(req, res){
        const { comment_id } = req.params
        const { user_id, post_id } = req.headers

        try {
            const tableComment = await Comment.findById(comment_id)
            const tablePost = await Post.findById(post_id)

            if(!tableComment) return res.status(400).send({ message: "Comment does not exist" })

            if(tableComment.post_id.equals(tablePost._id)){
                if(tablePost.user_id.equals(user_id)){
                    const deleteComment = await Comment.findByIdAndDelete(comment_id)

                    const commentPost = await Post.findById(post_id)
                    commentPost.comments.pull(user_id)
                    await commentPost.save()

                    return res.status(200).send({
                        message: "Comment successfully deleted by Post creator",
                        tablePost,
                        tableComment,
                    })
                }else if(tableComment.user_id.equals(user_id)){
                    const deleteComment = await Comment.findByIdAndDelete(comment_id)

                    const commentPost = await Post.findById(post_id)
                    commentPost.comments.pull(user_id)
                    await commentPost.save()
                    
                    return res.status(200).send({
                        message: "Comment successfully deleted by Comment creator",
                        tablePost,
                        tableComment,
                    })
                }else{
                    return res.status(400).send({ 
                        message: "Operation not allowed for this User" 
                    })
                }
            }else{
                return res.status(400).send({ 
                    message: "Operation not allowed for this Post"
                })
            }
        } catch(err) {
            return res.status(400).send(err)
        }
    },

    async editComment(req, res){
        const { comment_id } = req.params
        const {
            description
        } = req.body
        const { user_id } = req.headers

        try {
            const commentExists = await Comment.findById(comment_id)
            if(!commentExists) return res.status(400).send({ message: "Comment does not exist" })

            const belongsToUser = await Comment.findOne({ user_id }).where({ _id: comment_id })
            if(!belongsToUser) return res.status(400).send({ message: "Operation not allowed" })

            const editComment = await Comment.findByIdAndUpdate(comment_id, {
                description
            }, {
                new: true
            })

            return res.status(200).send({
                message: "Updated successfully",
                data: editComment
            })
        } catch(err) {
            return res.status(400).send(err)
        }
    }
}