module.exports = {
    getPosts: async (req, res) => {
        const { user_id } = req.session.user
        const { search } = req.query
        const db = req.app.get('db')
        
        let data = await db.get_posts(user_id)

        if(search) data = data.filter(elm => elm.title.toLowerCase().includes(search.toLowerCase()))

        res.status(200).send(data)
    },
    getAllPosts: async (req, res) => {
        const { search } = req.query
        const db = req.app.get('db')

        let data = await db.get_all_posts()

        if(search) data = data.filter(elm => elm.title.toLowerCase().includes(search.toLowerCase()))

        res.status(200).send(data)
    },
    getPost: async (req, res) => {
        const { id } = req.params
        const db = req.app.get('db')

        let data = await db.get_post(id)
        data = data[0]

        res.status(200).send(data)
    },
    newPost: (req, res) => {
        const { user_id } = req.session.user
        const { title, img, content} = req.body
        const db = req.app.get('db')
        db.new_post([title, img, content, user_id]).then(()=>{
            res.sendStatus(200)
        }).catch(() => {
            res.sendStatus(500)
        })
    },
    deletePost: (req, res) => {
        const { id } = req.params
        const db = req.app.get('db')

        db.delete_post(id).then(() => {
            res.sendStatus(201)
        }).catch(() => {
            res.sendStatus(500)
        })
    }

}