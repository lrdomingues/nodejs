const User = require('../Models/User')
const Post = require('../Models/Post')

module.exports = {
    async getProfile(req, res){
        const { user_id } = req.params

        try {
            const userInfo = await User.findById(user_id)
            if(!userInfo) return res.status(400).send({ message: "User does not exist" })
            
            const userPosts = await Post.find({ user_id })

            return res.status(200).send({
                message: "User found",
                userInfo,
                userPosts
            })
        } catch(err) {
            return res.status(400).send(err)
        }
    },

    async editProfile(req, res){
        const { user_id } = req.headers
        const { password, email } = req.body

        try {
            const userInfo = await User.findById(user_id)
            if(!userInfo) return res.status(400).send({ message: "User does not exist" })

            const editingProfile = await User.findByIdAndUpdate(user_id, {
                password,
                email
            }, {
                new: true
            })

            return res.status(200).send({
                message: "Updated successfully",
                data: editingProfile
            })
        } catch(err) {
            return res.status(400).send(err)
        }
    },
}