const mysql = require('mysql')

exports.emailRequest = (req, res) => {
    try{
        const db = mysql.createPool({
            host: process.env.database_host,
            user: process.env.database_login,
            password: process.env.database_password,
            database: process.env.database_name
        })
        db.query('SELECT * FROM emails', (errors, results) => {
            if(errors){
                console.log(errors)
            }else{
                res.send(Object.values(JSON.parse(JSON.stringify(results))))
            }
        })
    }catch(e){
        console.log(e)
    }
}