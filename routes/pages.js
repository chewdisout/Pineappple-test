const express = require('express')
const router = express.Router()
const fastcsv = require('fast-csv')
const fs = require('fs')
const mysql = require('mysql')
const emailController = require('../controllers/emails')
const emailControllerNoScript = require('../controllers/emails_noscript')
const emailRequest = require('../controllers/emails_request')
const emailDelete = require('../controllers/emails_delete')
const ws = fs.createWriteStream("emails.csv")
router.get('/', (req,res) => {
    res.render('index')
})
router.get('/success', (req,res) => {
    res.render('success')
})
router.get('/admin', (req,res) => {
    res.render('admin_panel')
})
router.post('/sendEmail', emailController.validation)
router.post('/sendEmailNoscript', emailControllerNoScript.validation)
router.post('/deleteEmails', emailDelete.delete)
router.post('/requestEmails', emailRequest.emailRequest)
router.post('/exportCsv', (req,res)=>{
    const db = mysql.createPool({
        host: process.env.database_host,
        user: process.env.database_login,
        password: process.env.database_password,
        database: process.env.database_name
    })
    db.query('SELECT * FROM emails', (errors,results) => {
        if(errors){
            console.log(errors)
        }else{
            let resultsJson = JSON.parse(JSON.stringify(results))
            let exportArray = [], iteration = 0
            for(let i = 0; i < resultsJson.length; i++){
                req.body.forEach((id) => {
                    if(resultsJson[i].id === parseInt(id)){
                        exportArray[iteration] = resultsJson[i]
                        iteration++
                    }
                })
            }
            console.log(exportArray)
            fastcsv.write(exportArray, {headers: true}).on("finish", ()=>{
                console.log("Csv created")
            }).pipe(ws)
        }
    })
})

module.exports = router