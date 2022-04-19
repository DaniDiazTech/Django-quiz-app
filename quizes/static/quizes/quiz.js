const url = window.location.href
console.log(url)

const quizBox = document.getElementById('quiz-box')

$.ajax({
    type: 'GET',
    url: `${url}/data`, // Gets data from JsonResponse
    success: function(response){
        const data = response.data 
        data.forEach(element => { // A dictionary of a Question and its answers
            for (const [question, answers] of Object.entries(element)){
                quizBox.innerHTML  += `
                    <hr>
                    <div class="mb-2">
                        <b>${question}</b>
                    </div>
                `
                answers.forEach(answer=>{
                    quizBox.innerHTML += `
                        <div>
                            <input type="radio" class="ans" id="${question}-${answer}" name="${question}" value="${answer}">
                            <label for="${question}">${answer}</label>
                        </div>
                    `
                })
            }
        })
    },
    error: function(error){
        console.log(error)
    }
})

const quizForm = document.getElementById('quiz-form')
const csrf = document.getElementsByName('csrfmiddlewaretoken') 

const sendData = () => {
    const elements = [...document.getElementsByClassName('ans')]
    const data = {}
    data['csrfmiddlewaretoken'] = csrf[0].value
    elements.forEach(el => {
        if (el.checked) {
            data[el.name] = el.value
        } else {
            if (!data[el.name]){
                data[el.name] = null
            }
        }
    })


    $.ajax({
        type: 'POST',
        url: `${url}/save`,
        data: data,
        success: function(response){
            const results = response.results
            quizForm.classList.add('not-visible') // Class defined in the custom css

            results.forEach(res =>{
                const resDiv = document.createElement('div')
                
                for (const [question, resp] of Object.entries(res)){
                    resDiv.innerHTML += question

                    const classes = ['container', 'p-3', 'text-light', 'h3']
                    resDiv.classList.add(...classes)

                    if (resp == 'not answered'){
                        resDiv.innerHTML += ' — Not answered'
                        resDiv.classList.add('bg-danger')
                    } else{
                        const answer = resp['answered']
                        const correct = resp['correct_answer']

                        if (answer == correct){
                            resDiv.classList.add('bg-success')
                            resDiv.innerHTML += ` Answered: ${answer}`
                        } else {
                            resDiv.classList.add('bg-danger')
                            resDiv.innerHTML += `| Answered: ${answer}`
                            resDiv.innerHTML += `| Correct answer: ${correct}`
                        }
                    }
                }
                const body = document.getElementsByTagName('body')[0] 
                body.append(resDiv)
            })
        },
        error: function(error){
            console.log(error)
        }
    })
}


quizForm.addEventListener('submit', element => {
    element.preventDefault()    

    sendData()
})
