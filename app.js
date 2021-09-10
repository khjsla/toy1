//require
const express = require('express')
const bodyParser = require('body-parser') //no use?
const request = require('request');
const http = require('http')
const multiparty = require('multiparty')
const xlsx = require('xlsx')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  limit: '150mb',
  extended: false,
}));

const indexRouter = require('./routes/index');


// for connection test
// not actually use
const url = 'http://apis.data.go.kr/1360000/CloudSatlitInfoService/getGk2aclaAll?serviceKey=rZjxgEACpJRnNk9bbnGYXYCzjOa1JvN3KKob05PnzI2N6k7%2FvMw1GWKCmIw0wMDYm8gmfwELqv8Xhat4%2Bx2mpg%3D%3D&numOfRows=10&pageNo=1&dateTime=202109010000&resultType=ca&dataType=json'
let test_data
//value 
request(url, (err, res, body) => {
  test_data = body
})
//API value 를 test_data 안에

/*
this is BASIC connection test
// app.get('/', async (req, res) => {
//   await res.send('express 로 만든 server basic.' + test_data)
//   // test_data 에 value 말고 뭐 많음 참고로!
// })
// app.listen(3000, () => {
//   console.log(`3000번 port에 http server를 띄웠습니다.`)
// })
// // til now test
*/

app.get('/', (req, res, next) => {
  let contents = '';
  contents += '<html><body>';
  contents += '   <form action="/" method="POST" enctype="multipart/form-data">';
  contents += '       <input type="file" name="xlsx" />';
  contents += '       <input type="submit" />';
  contents += '   </form>';
  contents += '</body></html>';

  res.send(contents);
});

app.post('/', (req, res, next) => {
  const resData = {};

  const form = new multiparty.Form({
      autoFiles: true,
  });

  form.on('file', (name, file) => {
      const workbook = xlsx.readFile(file.path);
      const sheetnames = Object.keys(workbook.Sheets);

      let i = sheetnames.length;

      while (i--) {
          const sheetname = sheetnames[i];
          resData[sheetname] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetname]);
      }
  });

  form.on('close', () => {
      res.send(resData);
  });

  form.parse(req);
});

http.createServer(app).listen(3000, () => {
  console.log('HTTP server listening on port ' + 3000);
});

app.use('/test', indexRouter);