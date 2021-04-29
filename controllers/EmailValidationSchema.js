class EmailValidationSchema {
    constructor(email, noscript) {
        this.email = email
        this.noscript = noscript
        this.regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    }
    emailValidation(res,db){
        if(this.email === ''){
            if(this.noscript === false){
                return res.send('Email address is required')
            }else{
                return res.render('index', {
                    emailError: 'Email address is required'
                })
            }
        }else if(!this.regex.test(this.email)){
            if(this.noscript === false){
                return res.send('Please provide a valid e-mail address')
            }else{
                return res.render('index', {
                    emailError: 'Please provide a valid e-mail address'
                })
            }
        }else if(this.email.split('@')[1].split('.')[1] === 'co'){
            if(this.noscript === false){
                return res.send('We are not accepting subscriptions from Colombia emails')
            }else{
                return res.render('index', {
                    emailError: 'We are not accepting subscriptions from Colombia emails'
                })
            }
        }else{
            this.emailAddDB(db, res)
        }
    }
    emailAddDB(database, res){
        database.query('SELECT * FROM emails WHERE email = ?', [this.email], (err, results) => {
            if(err){
                console.log(err)
            }else{
                if(results.length === 0){
                    database.query(
                        'INSERT INTO emails SET ?',
                        {email: this.email, date: new Date(Date.now())},
                        (errors, results) => {
                        if(errors){
                            console.log(errors)
                        }else{
                            if(this.noscript === false){
                                return res.send('/success')
                            }else{
                                return res.render('success')
                            }
                        }
                    })
                }else{
                    if(this.noscript === false){
                        return res.send('Email already registered')
                    }else{
                        return res.render('index', {
                            emailError: 'Email already registered'
                        })
                    }

                }
            }
        })
    }
}

module.exports = EmailValidationSchema