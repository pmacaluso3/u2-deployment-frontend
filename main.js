const backendUrl = 'http://localhost:3001'

const showSection = (targetId) => {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
  document.querySelector(targetId).classList.remove('hidden')
}

const fetchDinos = () => {
  axios.get(backendUrl + '/dinos')
  .then((response) => {
    document.querySelector('#index-content').textContent = ''
    for (dino of response.data.dinos) {
      const dinoDiv = document.createElement('div')
      dinoDiv.innerText = `${dino.name}, the ${dino.type} dinosaur`
      document.querySelector('#index-content').append(dinoDiv)
    }
  })
}

document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = '#' + event.target.id.replace('-link', '-content')
    showSection(targetId)
  })
})

document.querySelector('#new-dino-form').addEventListener('submit', (event) => {
  event.preventDefault()

  const name = document.querySelector('#new-dino-name').value
  const type = document.querySelector('#new-dino-type').value

  axios.post(backendUrl + '/dinos', {
    name, type
  })
  .then((response) => {
    showSection('#index-content')
    fetchDinos()
  })
})

document.querySelector('#index-link').addEventListener('click', () => {
  fetchDinos()
})
