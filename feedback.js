const section = document.querySelector('.feedback-list')
const _name = document.querySelector('#name')
const feed_b = document.querySelector('#feedback')
const button = document.querySelector('#submit')
const lskey = 'FBACKS'

let username = ''
let usertext = ''

const feedbacks = getState()

button.addEventListener('click', () => {
    username = _name.value
    usertext = feed_b.value    
    createCard(username, usertext)
}) 

function createCard(name, text) {
    if(name == '' || text == '') {
        if(username == '') _name.classList.add('invalid')
        if(usertext == '') feed_b.classList.add('invalid')
        

        setTimeout(() => {
            _name.classList.remove('invalid')
            feed_b.classList.remove('invalid')
        }, 5000)
    } else {        
        const newFeedback = {
            id: generateID(),
            nickname: name,
            feed_text: text
        }

        _name.value = ''
        feed_b.value = ''

        feedbacks.push(newFeedback)
        saveState()

        init()

    }

}

function renderCards() {
    if(feedbacks.length == 0) {
        section.innerHTML = '<p>There is no one feedback here.</p>'
    } else {
        let html = ''
        for (i = 0; i <= feedbacks.length; i++) {
            html += `<div class='card'>
                        <h4 id='name'>${feedbacks[i].nickname}</h4>
                        <p id='feedback'>${feedbacks[i].feed_text}</p>
                        <button data-id=${feedbacks[i].id} id='remove'>Удалить отзыв</button>
                    </div>`
            section.innerHTML = html
            const remove = document.querySelectorAll('#remove')
            remove.forEach(el => {
                el.addEventListener('click', (event) => {
                    const id = event.target.dataset.id
                    const fb = feedbacks.find(j => j.id === id)
                    let index = feedbacks.indexOf(fb)
                    feedbacks.splice(index, 1)
                    saveState()

                    init()
                })
            })
        }

        init()

    }

    

}

function generateID() {
    let symbols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    let digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    let answer = ''

    function getRandomInt(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    for (k = 0; k <= 5; k++) {
        answer += symbols[getRandomInt(0, symbols.length - 1)] + digits[getRandomInt(0, digits.length - 1)]
    }

    return answer
}

function saveState() {
    localStorage.setItem(lskey, JSON.stringify(feedbacks))
}

function getState() {
    const row = localStorage.getItem(lskey)
    return row ? JSON.parse(row) : []
}

function init() {
    renderCards()
}

init()