const makeFichas = require('./database/fichas')
const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

const fichas = makeFichas()

app.get('/', (req, res) => {
    const title = 'MeFit';
    res.render('index', { title: title, fichas })
})

app.get('/ficha/:id', (req, res) => {
    const title = 'MeFit';
    const id = req.params.id;
    res.render('ficha/index', { title: title, ficha: fichas[id] })
})

app.listen(8080, () => console.log('App running'))