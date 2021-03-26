const pool = require('../database/pg')

const controller = {
    addMusic: async (req, res) => {
        try {
            const { name, tags } = req.body
            if (!name || !tags || tags.length === 0)
                throw Error("All fields are mandatory")
            const resp = await pool.query("INSERT INTO music (name, audioBuffer, tags, createdBy) VALUES($1, $2, $3, $4) RETURNING *", [
                name, 
                req.file.buffer,
                JSON.parse(tags),
                req.user
            ])
            res.json(resp.rows[0])
        }
        catch(e){
            console.log(e)
            res.status(400).json(e.message)
        }
    },
    getAllMusic: async (req, res) => {
        try {
            const page = parseInt(req.query.page)
            const limit = parseInt(req.query.limit) || 10
            const offset = page ? limit * (page - 1) : 0
            const tags = req.query.category?.split(' ') || []
            const result = await pool.query("SELECT * FROM music WHERE $1 <@ tags LIMIT $2 OFFSET $3", [tags, limit, offset])
            const result2 = await pool.query("SELECT COUNT(*) OVER() FROM music WHERE $1 <@ tags", [tags])
            const totalPages = Math.ceil(result2.rows.length / limit);
            if (totalPages < page)
                throw Error("Request Pages Exceeded")
            if (result.rows.length === 0)
                throw Error("No music founded right now")
            res.json({ data: result.rows, totalPages })
        }
        catch(e){
            console.log(e)
            res.status(400).json(e.message)
        }
    },
    getMusic: async (req, res) => {
        try {
            const id = req.params.id
            const result = await pool.query("SELECT * FROM music WHERE _id = $1", [id])
            if (result.rows.length === 0)
                throw Error("No music founded right now")
            res.json(result.rows[0])
        }
        catch(e){
            console.log(e)
            res.status(400).json(e.message)
        }
    },
    getLatest: async (req, res) => {
        try {
            const result = await pool.query("SELECT * FROM music ORDER BY timestamps DESC LIMIT 10")
            if (result.rows.length === 0)
                throw Error("No music founded right now")
            res.json(result.rows)
        } 
        catch(e){
            console.log(e)
            res.status(400).json(e.message)
        }
    },
    getTrending: async (req, res) => {
        try {
            const result = await pool.query("SELECT * FROM music ORDER BY downloadcount DESC LIMIT 10")
            if (result.rows.length === 0)
                throw Error("No music founded right now")
            res.json(result.rows)
        } 
        catch(e){
            console.log(e)
            res.status(400).json(e.message)
        }
    },
    downloadMusic: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await pool.query("SELECT downloadcount FROM music where _id = $1", [id])
            const downloaded = result.rows[0].downloadcount;
            const result2 = await pool.query("UPDATE music SET downloadCount = $1 WHERE _id = $2 returning *", [downloaded + 1, id])
            res.json(result2.rows[0])
        } 
        catch(e){
            console.log(e)
            res.status(400).json(e.message)
        }
    }
}

module.exports = controller