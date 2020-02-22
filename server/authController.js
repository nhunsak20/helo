const bcrypt = require('bcrypt')

module.exports = {
    login: async (req, res) => {
        const { username, password } = req.body
        const db = req.app.get('db')

        let user = await db.check_user(username)
        user = user[0]

        if(!user){
            return res.status(400).send('Please go to register')
        }

        const isAuth = bcrypt.compareSync(password, user.password)

        if(isAuth) {
            delete user.password
            return res.status(201).send(user)
        }
        res.status(401).send('Incorrect password')
    },
    register: (req, res) => {
        const { username, password } = req.body
        const db = req.app.get('db')
        
        const random = Math.floor(Math.random() * 21) + 1
        const profile_pic = `https://robohash.org/${random}`

        let user = db.check_user(username)
        user = user[0]

        if(user){
            return res.status(400).send('Username is already exists')
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        let newUser = db.add_register({username, hash, profile_pic})
        newUser = newUser[0]

        delete newUser.password

        res.status(201).send(newUser)
    }
}