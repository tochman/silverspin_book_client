const apiUrl = 'http://localhost:3002/books'

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

const submitHandler = async () => {
  event.preventDefault()
  submitData()
    .then((response) => {
      console.log(response)
    })

}
document.addEventListener('DOMContentLoaded', () => {
  let displayElement = document.getElementById('display')
  fetchData().then((books) => {
    books.forEach(book => {
      const showDisplayElement = document.createElement('div')
      let html = `<p>${book.title} by ${book.author}</p>`

      showDisplayElement.innerHTML = html
      displayElement.appendChild(showDisplayElement)
    })
  })

})