const User = require('../Models/User')

module.exports = {
    async createUser(req, res){
        const { 
            name,
            password,
            email
         } = req.body

         try {
            const userAlreadyExists = await User.findOne({name})
            
            if(userAlreadyExists) return res.status(400).send({
                message: 'User already exists. Try a different one'
            })

            const createUser = await User.create({
                name,
                password,
                email
            })

            return res.status(200).send({
                message: 'User created successfully',
                data: createUser
            })
         } catch(err) {
            return res.status(400).send(err)
         }
    },

    async listUsers(req, res) {
        try{
            const allUsers = await User.find()

            return res.status(200).send({
                message: 'All Users found',
                data: allUsers
            })
        } catch(err) {
            return res.status(400).send(err)
        }
    }
}