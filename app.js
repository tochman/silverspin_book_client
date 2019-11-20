const apiUrl = 'http://localhost:3002/books'

const fetchData = async () => {
  let data = await (await fetch(apiUrl)).json()
  return data
}
document.addEventListener('DOMContentLoaded', () => {
  let displayElement = document.getElementById('display')
  fetchData().then((books) => {
    books.forEach(book => {
      const showDisplayElement = document.createElement('div')
      let html = ''
      
      showDisplayElement.innerHTML = html
      displayElement.appendChild(showDisplayElement)
    })
  })

})