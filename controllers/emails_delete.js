const mysql = require('mysql')

exports.delete = (req, res) => {
    try{
        const db = mysql.createPool({
            host: process.env.database_host,
            user: process.env.database_login,
            password: process.env.database_password,
            database: process.env.database_name
        })
        db.query('DELETE FROM emails WHERE id=?', [req.body.id], (errors,results) => {
            if (errors){
                res.send(errors)
            }else{
                res.send("Deleted")
            }
        })
    }catch(e){
        console.log(e)
    }
}