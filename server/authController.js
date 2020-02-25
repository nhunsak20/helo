const bcrypt = require('bcrypt')

module.exports = {
    login: async (req, res) => {
        const { username, password } = req.body
        const { session } = req
        const db = req.app.get('db')

        let user = await db.check_user(username)
        user = user[0]

        if(!user){
            return res.status(400).send('Please go to register')
        }

        const isAuth = bcrypt.compareSync(password, user.password)

        if(isAuth) {
            // delete user.password
            // return res.status(201).send(user)

            session.user = {
                username: user.username,
                user_id: user.id,
                profile_pic: user.profile_pic
            }

            return res.status(202).send(session.user)
        }
        res.status(401).send('Incorrect password')
    },
    register: async (req, res) => {
        const { username, password } = req.body
        const { session } = req
        const db = req.app.get('db')
        
        const random = Math.floor(Math.random() * 21) + 1
        const profile_pic = `https://robohash.org/${random}`

        let user = await db.check_user(username)
        user = user[0]

        if(user){
            return res.status(400).send('Username is already exists')
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        let newUser = await db.add_register([username, hash, profile_pic])
        newUser = newUser[0]

        session.user = {
            username: newUser.username,
            user_id: newUser.id,
            profile_pic: newUser.profile_pic
        }

        res.status(201).send(session.user)
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getUser: (req, res) => {
        if(req.session.user) {
            return res.status(200).send(req.session.user)
        }
        res.status(200).send('')
    }
}