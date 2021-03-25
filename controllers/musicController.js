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
            res.json(resp.rows)
        }
        catch(e){
            console.log(e)
            res.json(e.message)
        }
    }
}

module.exports = controller