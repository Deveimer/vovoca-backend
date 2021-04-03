const pool = require('../database/pg')

const controller = {
    getAllMusic: async (req, res) => {
        try {
            const page = parseInt(req.query.page)
            const limit = parseInt(req.query.limit) || 5
            const offset = page ? limit * (page - 1) : 0
            const tags = req.query.category?.split(' ') || ["hip-hop", "bass", "chill", "beats", "musical", "edm", "electric", "slow", "vocal", "house"]
            const result = await pool.query("SELECT music._id, music.name, music.downloadcount, music.tags, admin.username as artist FROM music JOIN admin on music.createdby = admin._id WHERE $1 && music.tags LIMIT $2 OFFSET $3", [tags, limit, offset])
            const result2 = await pool.query("SELECT COUNT(*) OVER() FROM music WHERE $1 <= tags", [tags])
            let totalPages = Math.ceil(result2.rows.length / limit);
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
            const result = await pool.query("SELECT music._id, music.name, music.downloadcount, music.tags, admin.username as artist FROM music JOIN admin on music.createdby = admin._id WHERE music._id = $1", [id])
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
            const tags = req.query.category?.split(' ') || []
            const result = await pool.query("SELECT * FROM music WHERE $1 <@ tags ORDER BY timestamps DESC LIMIT 5", [tags])
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
            const tags = req.query.category?.split(' ') || []
            const result = await pool.query("SELECT * FROM music WHERE $1 <@ tags ORDER BY downloadcount DESC LIMIT 5", [tags])
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