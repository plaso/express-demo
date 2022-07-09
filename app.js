const express = require('express')

const app = express()

app.use(express.static('public'))

app.get('/', (req, res, next) => {
  console.log(__dirname);
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/marco', (req, res, next) => {
  console.log(req)
  res.send('Esto ta chupao')
})

app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + '/views/notFound.html')
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})