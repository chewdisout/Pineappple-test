const mysql = require('mysql')
const emailSchema = require('./EmailValidationSchema.js')

exports.validation = (req, res) => {
    try{
        const email = req.body.email
        const emailAddAndValidation = new emailSchema(email, true)
        const db = mysql.createPool({
            host: process.env.database_host,
            user: process.env.database_login,
            password: process.env.database_password,
            database: process.env.database_name
        })
        emailAddAndValidation.emailValidation(res, db)

    }catch(e){
        console.log(e)
    }
}