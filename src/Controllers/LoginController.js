const User = require('../Models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    async login(req, res){
        const {
            name,
            password
        } = req.body

        try{
            const validUserName = await User.findOne({name})
            if(!validUserName) return res.status(400).send({ message: 'User does not exist' })

            const validPassword = await User.findOne({ password }).where({ name })
            if(!validPassword) return res.status(400).send({ message: 'Invalid password' })

            const loggedIn = validPassword

            if(loggedIn){
                const token = jwt.sign(
                    {userId: loggedIn._id}, 
                    process.env.JWT_SECRET, 
                    {expiresIn: 86400})

                return res.json({
                    auth: true,
                    name,
                    token
                })
            }

            return res.status(401).end()

        } catch(err) {
            return res.status(400).send(err)
        }
    }
}