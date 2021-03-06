const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')

require('dotenv').config()

const app = express()
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'build')))

require('./config/database')

app.use(logger('dev'))
app.use(express.json())

app.use('/api/users', require('./routes/api/users'))
app.use(require('./config/auth'));
app.use('/api/entries', require('./routes/api/entries'))


app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const port = process.env.PORT || 3001

app.listen(port, function() {
    console.log(`express app running on port ${port}`)
})

