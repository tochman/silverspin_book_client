const apiUrl = 'http://localhost:3002/books'
let connection = new WebSocket('ws://localhost:8080')
connection.addEventListener('message', message => {
  console.log(message.data)
  let alerts = document.getElementsByClassName('alert');
  while (alerts[0]) {
    alerts[0].parentNode.removeChild(alerts[0]);
  }
  let incomingMessage = {}
  try {
    incomingMessage = JSON.parse(message.data)
  } catch {
    incomingMessage.message = message.data
  }

  let headerElement = document.getElementById('header')
  let incomingMessageDisplay = document.createElement('div')
  let htmlTemplate = `
    <div class="alert">
      <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
      ${incomingMessage.message}
    </div>`
  incomingMessageDisplay.innerHTML = htmlTemplate
  headerElement.insertAdjacentElement('afterend', incomingMessageDisplay)
  if (incomingMessage.status === 'success') {
    displayBooks()
  }
})


const fetchData = async () => {
  let data = await (await fetch(apiUrl, { credentials: 'include' })).json()
  return data
}

const submitData = async () => {
  let response = await (await fetch('http://localhost:3002/books', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    },
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify({ author: event.target.author.value, title: event.target.title.value })
  })).json()
  return response
}

const displayBooks = () => {
  let displayElement = document.getElementById('display')
  displayElement.innerHTML = ''
  fetchData().then((books) => {
    books.forEach(book => {
      const showDisplayElement = document.createElement('div')
      let html = `<p>${book.title} by ${book.author}</p>`

      showDisplayElement.innerHTML = html
      displayElement.appendChild(showDisplayElement)
    })
  })
}

const submitHandler = async () => {
  event.preventDefault()
  submitData()
    .then((response) => {
      console.log(response)
    })
}
document.addEventListener('DOMContentLoaded', () => {
  displayBooks()
})