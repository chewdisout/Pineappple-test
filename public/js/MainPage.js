class UserEmail {
    constructor(emailValue, checkboxId) {
        this.email = emailValue
        this.checkbox = document.getElementById(checkboxId)
        this.regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
        this.btnSubmit = document.getElementById("btnEmailSubmit")
    }
    validateEmail(){
        if(this.email === ''){
            return 'Email address is required'
        }
        else if(!this.regex.test(this.email)){
            return 'Please provide a valid e-mail address'
        }
        else if(this.email.split('@')[1].split('.')[1] === 'co'){
            return 'We are not accepting subscriptions from Colombia emails'
        }else{
            return 'Validated'
        }
    }
    isChecked(){
        if(this.checkbox.checked === false){
            return 'You must accept the terms and conditions'
        }else{
            return 'Checked'
        }
    }
    errorMessage(errorBlock, errorMessage){
        document.getElementById(errorBlock).innerText = errorMessage
    }
    btnActions(boolean){
        if(boolean) {
            this.btnSubmit.disabled = true
            this.btnSubmit.style.opacity = "0.3"
            this.btnSubmit.style.cursor = "default"
        }else{
            this.btnSubmit.disabled = false
            this.btnSubmit.style.opacity = ""
            this.btnSubmit.style.cursor = ""
        }
    }
    canSend(){
        if(this.validateEmail() === 'Validated' && this.isChecked() === 'Checked'){
            this.btnActions(false)
        }
    }
}

$(document).ready(() => {
    let userInput = new UserEmail('', 'checkbox')
    userInput.btnActions(true)
    inputResizeEvent()
    // INPUT POSITION
    $(window).resize(() => {
        inputResizeEvent()
    })
    // EMAIL AND CHECKBOX VALIDATION
    $('#userEmail').keyup(() => {
        userInput.email = $('#userEmail').val()
        if(userInput.validateEmail() !== 'Validated'){
            userInput.errorMessage("email-error", userInput.validateEmail())
            userInput.btnActions(true)
        }else{
            userInput.errorMessage("email-error", '')
            userInput.canSend()
        }
    })
    $('#checkBox').change(() => {
        if(userInput.isChecked() !== 'Checked'){
            userInput.errorMessage("check-error", userInput.isChecked())
            userInput.btnActions(true)
        }else{
            userInput.errorMessage("check-error", '')
            userInput.canSend()
        }

    })
    $('#btnEmailSubmit').click((event) => {
        event.preventDefault()
        $.ajax({
            url: '/sendEmail',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify($('#userEmail').serializeArray()),
            success: function (response) {
                if(response === '/success'){
                    window.location.href = response
                }else{
                    userInput.errorMessage("email-error", response)
                }
            }
        })
    })
})



function inputResizeEvent() {
    const userInput = document.getElementById("userEmail")
    const emailUser = document.getElementById("errors")
    const position = $('#descriptionField').position()
    const sectionWidth = $('section:first').width()
    const checkbox = document.getElementById("checkBox")
    if($(window).width() > 1280){
        let userFutureWidth = (sectionWidth - position.left) + 116
        userInput.style.width = `${userFutureWidth}px`
        checkbox.style.left = `${position.left}px`
        emailUser.style.left = `${position.left}px`
    }else{
        userInput.style.width = ``
        checkbox.style.left = ``
        emailUser.style.left = ``
    }
}