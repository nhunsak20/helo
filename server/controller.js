module.exports = {
    getPosts: async (req, res) => {
        const { id } = req.params
        const db = req.app.get('db')
        if(id) { 
            let data = await db.get_post(id)
            console.log('id', id)
            res.status(200).send(data)
        }
        else {
            let data = await db.get_all_posts()
            console.log('no id')
            res.status(200).send(data)
        }
        
    },
    getAllPosts: async (req, res) => {
        const db = req.app.get('db')
        let data = await db.get_all_posts()

        res.status(200).send(data)
    },
    newPost: (req, res) => {
        const { id } = req.params
        const { title, img, content} = req.body
        const db = req.app.get('db')

        db.new_post([title, img, content, id]).then(()=>{
            res.sendStatus(201)
        }).catch(()=>{
            res.sendStatus(500)
        })
    }

}