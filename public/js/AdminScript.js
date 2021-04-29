const deleteIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"11\" height=\"11\" fill=\"currentColor\" class=\"bi bi-trash\" viewBox=\"0 0 16 16\">\n" +
    "  <path d=\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z\"/>\n" +
    "  <path fill-rule=\"evenodd\" d=\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"/>\n" +
    "</svg>"
const dateSort = {
    state: true,
    sortCriteria: "Newest"
}
const nameSort = {
    state: false,
    sortCriteria: "a-z"
}
class emails {
    constructor(pageContainer) {
        this.pageContainer = pageContainer
        this.pages = this.pageContainer.getElementsByTagName("ul")
    }
    getCurrentPage(){
        return this.pageContainer.querySelector('.current_page')
    }
    async getEmails(){
        let responseArray
        await $.ajax({
            url: '/requestEmails',
            method: 'post',
            success: (response) => {
                responseArray = response
            }
        })
        return responseArray
    }
    getPageCount(){
        this.pages[0].classList.add('current_page')
        const ulWidth = this.pages[0].getBoundingClientRect().width
        for(let i = 0; i < this.pages.length; i++){
            this.pages[i].style.left = ulWidth * i + "px"
        }
    }
    moveLeft(){
        let nextSlide = this.getCurrentPage().nextElementSibling
        let amountToMove = nextSlide.style.left
        this.pageContainer.style.transform = 'translateX(-' + amountToMove + ')'
        this.getCurrentPage().classList.remove('current_page')
        nextSlide.classList.add('current_page')
    }
    moveRight(){
        let previousSlide = this.getCurrentPage().previousElementSibling
        let amountToMove = previousSlide.style.left
        this.pageContainer.style.transform = 'translateX(-' + amountToMove + ')'
        this.getCurrentPage().classList.remove('current_page')
        previousSlide.classList.add('current_page')
    }
    async createPages(checkOnIndex, emailIndexCheck, searchCheck, searchValue){
        let response = await this.getEmails()
        let newResponse
        if(dateSort.state){
            newResponse = this.sortByDate(response)
        }else if(nameSort.state){
            newResponse = this.sortByName(response)
        }
        let iterationCount = 0
        let ulElement = document.createElement('ul')
        newResponse.forEach((email) => {
            let li = document.createElement('li')
            li.id = email.id + "li"
            let x = document.createElement("INPUT");
            x.id = email.id
            x.setAttribute("type", "checkbox");
            let divEmail = document.createElement('div')
            divEmail.classList.add('email')
            divEmail.innerText = email.email
            let divDate = document.createElement('div')
            divDate.classList.add('date')
            divDate.innerText = email.date.slice(0, 10)
            let divDelete = document.createElement('div')
            divDelete.innerHTML = `<div onclick="deleteEmailFromDb(this)" id="${email.id}">${deleteIcon}</div>`
            let emailIndex = email.email.split('@')
            let emailTag = emailIndex[1].split('.')[0]
            if(checkOnIndex && emailTag === emailIndexCheck){
                if(searchCheck){
                    if(email.email.indexOf(searchValue) > -1){
                        li.append(x, divEmail, divDate, divDelete)
                        ulElement.append(li)
                        document.getElementById("pageContainer").append(ulElement)
                        iterationCount++
                        if(iterationCount % 10 === 0){
                            ulElement = document.createElement('ul')
                        }
                    }
                }else{
                    li.append(x, divEmail, divDate, divDelete)
                    ulElement.append(li)
                    document.getElementById("pageContainer").append(ulElement)
                    iterationCount++
                    if(iterationCount % 10 === 0){
                        ulElement = document.createElement('ul')
                    }
                }
            }else if(!checkOnIndex){
                if(searchCheck){
                    if(email.email.indexOf(searchValue) > -1){
                        li.append(x, divEmail, divDate, divDelete)
                        ulElement.append(li)
                        document.getElementById("pageContainer").append(ulElement)
                        iterationCount++
                        if(iterationCount % 10 === 0){
                            ulElement = document.createElement('ul')
                        }
                    }
                }else {
                    li.append(x, divEmail, divDate, divDelete)
                    ulElement.append(li)
                    document.getElementById("pageContainer").append(ulElement)
                    iterationCount++
                    if (iterationCount % 10 === 0) {
                        ulElement = document.createElement('ul')
                    }
                }
            }

        })
        this.getPageCount()
    }
    async writeEmailTags(){
        let response = await this.getEmails()
        let emailBox = document.getElementById("emailTags")
        let tagArray = [], tagArrayIndex = 0
        response.forEach((email) => {
            let emailIndex = email.email.split('@')
            let emailTag = emailIndex[1].split('.')
            let repeat = 0
            tagArray.forEach((emailTagItem) => {
                if(emailTagItem === emailTag[0]){
                    repeat++
                }
            })
            if(repeat === 0){
                tagArray[tagArrayIndex] = emailTag[0]
                let li = document.createElement('li')
                li.innerHTML = `<button id="${tagArray[tagArrayIndex]}" onclick="sortByEmailTag(this)">${tagArray[tagArrayIndex]}</button>`
                emailBox.append(li)
                tagArrayIndex++
            }
        })
        return tagArray
    }
    clearPageContainer(){
        this.pageContainer.style.transform = 'translateX(0)'
        this.pageContainer.innerHTML = ""
        document.getElementById("page-number").innerText = "1"
    }
    sortByName(array){
        if(nameSort.sortCriteria === "a-z"){
            for(let i = 0; i < array.length - 1; i++){
                if(array[i].email > array[i + 1].email){
                    [array[i], array[i + 1]] = [array[i + 1], array[i]]
                    i = -1
                }
            }
            return array
        }else if(nameSort.sortCriteria === "z-a"){
            for(let i = 0; i < array.length - 1; i++){
                if(array[i].email < array[i + 1].email){
                    [array[i], array[i + 1]] = [array[i + 1], array[i]]
                    i = -1
                }
            }
            return array
        }
    }
    sortByDate(array){
        if(dateSort.sortCriteria === "Newest"){
            for(let i = 0; i < array.length - 1; i++){
                if(array[i].id > array[i + 1].id){
                    [array[i], array[i + 1]] = [array[i + 1], array[i]]
                    i = 0
                }
            }
            return array
        }else if(dateSort.sortCriteria === "Oldest"){
            for(let i = 0; i < array.length - 1; i++){
                if(array[i].id < array[i + 1].id){
                    [array[i], array[i + 1]] = [array[i + 1], array[i]]
                    i = -1
                }
            }
            return array
        }
    }
}
let checkOnIndex = false
let emailIndexCheck = "none"
const emailActions = new emails(document.getElementById("pageContainer"))
emailActions.createPages(checkOnIndex, emailIndexCheck)
emailActions.writeEmailTags()
document.getElementById("left").addEventListener('click', () => {
    emailActions.moveLeft()
    f(1)
})
document.getElementById("right").addEventListener('click', () => {
    emailActions.moveRight()
    f(-1)
})
document.getElementById("searchEmails").addEventListener('keyup', () => {
    let searchValue = document.getElementById("searchEmails").value
    emailActions.clearPageContainer()
    emailActions.createPages(checkOnIndex, emailIndexCheck, true, searchValue)
})
function sortByEmailTag(btnThis) {
    if(!checkOnIndex){
        emailActions.clearPageContainer()
        checkOnIndex = true
        emailIndexCheck = btnThis.id
        emailActions.createPages(checkOnIndex, emailIndexCheck)
    }else if(btnThis.id === emailIndexCheck){
        emailActions.clearPageContainer()
        let checkOnIndex = false
        let emailIndexCheck = "none"
        emailActions.createPages(checkOnIndex, emailIndexCheck)
    }else{
        emailActions.clearPageContainer()
        checkOnIndex = true
        emailIndexCheck = btnThis.id
        emailActions.createPages(checkOnIndex, emailIndexCheck)
    }
}
function deleteEmailFromDb(iconId){
    console.log(iconId.id)
    let emailId = {
        id: iconId.id
    }
    $.ajax({
        url: '/deleteEmails',
        method: 'post',
        contentType: 'application/json',
        data: JSON.stringify(emailId),
        success: function (response) {
            if(response === "Deleted"){
                document.getElementById(iconId.id + "li").remove()

            }
        }
    })
}
function switchDateSort() {
    dateSort.state = true
    nameSort.state = false
    if(dateSort.sortCriteria === "Newest"){
        dateSort.sortCriteria = "Oldest"
        emailActions.clearPageContainer()
        emailActions.createPages(checkOnIndex, emailIndexCheck)
    }else{
        dateSort.sortCriteria = "Newest"
        emailActions.clearPageContainer()
        emailActions.createPages(checkOnIndex, emailIndexCheck)
    }
}
function switchNameSort() {
    dateSort.state = false
    nameSort.state = true
    if(nameSort.sortCriteria === "a-z"){
        nameSort.sortCriteria = "z-a"
        emailActions.clearPageContainer()
        emailActions.createPages(checkOnIndex, emailIndexCheck)
    }else{
        nameSort.sortCriteria = "a-z"
        emailActions.clearPageContainer()
        emailActions.createPages(checkOnIndex, emailIndexCheck)
    }
}
function f(operation) {
    let pageNumber = parseInt(document.getElementById("page-number").innerText) + operation
    document.getElementById("page-number").innerText = pageNumber + ""
}
// csv export
$(document).ready(() => {
    $('#importCsv').click(() => {
        let checkArray = $('input:checkbox:checked')
        if(checkArray.length > 0){
            let exportArray = []
            for(let i = 0; i < checkArray.length; i++){
                exportArray[i] = checkArray[i].id
            }
            $.ajax({
                url: "/exportCsv",
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify(exportArray)
            })
        }else{
            alert("Nothing checked")
        }
    })
})
