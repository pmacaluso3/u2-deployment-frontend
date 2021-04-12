const express = require('express')
const app = express()

const path = require('path')
const replaceInFile = require('replace-in-file')

app.get('/', (req, res) => {
  const filepath = path.join(__dirname, 'index.html')
  res.sendFile(filepath)
})

app.get('/main.js', async (req, res) => {
  const filepath = path.join(__dirname, 'main.js')
  await replaceInFile({
    files: filepath,
    from: 'http://localhost:3001',
    to: 'https://u2-deployment-backend.herokuapp.com'
  })
  res.sendFile(filepath)
})

app.get('/style.css', (req, res) => {
  const filepath = path.join(__dirname, 'style.css')
  res.type('css').sendFile(filepath)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
})