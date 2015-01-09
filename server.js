var http = require('http')

var status = 200

http.createServer(function (req, res) {
  randomDelay(function () {
    res.statusCode = status
    res.end()
  })
}).listen(1337)

function randomDelay (fn) {
  setTimeout(fn, Math.random() * 1000)
}

process.on('SIGINT', function () {
  status = status == 200 ? 500 : 200
})