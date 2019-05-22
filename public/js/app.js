const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')


weatherForm.addEventListener('submit', (e)=>{
    message1.textContent = "Loading..."
    message2.textContent = ''
    e.preventDefault()
    const location = search.value
    fetch('/weather?address='+location).then((respone) => {
    respone.json().then((data) => {
        if(data.error) {
            message1.textContent = data.error
        } else{
            message1.textContent = data.location
            message2.textContent = data.summary
        }
    })
})  
})