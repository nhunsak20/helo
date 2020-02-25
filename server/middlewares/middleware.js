module.exports = {
    userOnly: (req, res, next) => {
        if(!req.session.user) {
            return res.status(500).send('User have been logout and please log in')
        }
        next()
    }   
}