//require
const express = require('express')
const bodyParser = require('body-parser') //no use?

const app = express()
app.use(bodyParser.json())

const indexRouter = require('./routes/index');

// for connection test
// not actually use
app.get('/', (req, res) => {
    res.send('express 로 만든 server basic.')
  })
  app.listen(3000, () => {
    console.log(`3000번 port에 http server를 띄웠습니다.`)
  })

app.use('/test', indexRouter);