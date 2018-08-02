const express = require('express');
const bodyParser= require('body-parser');
const app = express();
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

const MongoClient = require('mongodb').MongoClient
var db
MongoClient.connect('mongodb://test:test11@ds259001.mlab.com:59001/first_node_project', { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err)
  db = client.db('first_node_project') // whatever your database name is

  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.get('/', (req, res) => {
    db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)

    res.render('index.ejs', {quotes: result})
  })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved')
    res.redirect('/')
  })
})
