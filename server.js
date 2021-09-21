const http = require('http');
const url = require('url');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

http.createServer((request, response) => {
  const path = url.parse(request.url, true).pathname; // url에서 path 추출
  if (request.method === 'GET') { // GET 요청이면
    if (path === '/' || path === '/index.html') { // 주소가 /이면
      response.writeHead(200,{'Content-Type':'text/html'});
      fs.readFile(__dirname + '/index.html', (err, data) => {
        if (err) {
          return console.error(err);
        }
        response.end(data, 'utf-8');
      });
    }
    else if(path === '/test') { 
      response.writeHead(200,{'Content-Type':'text/html'});
      fs.readFile(__dirname + '/index2.html', (err, data) => {
        if (err) {
          return console.error(err);
        }
        response.end(data, 'utf-8');
      });
    }
    else if(path === '/candleStick.js') { 
        response.writeHead(200,{'Content-Type':'text/javascript'});
        fs.readFile(__dirname + '/candleStick.js', (err, data) => {
            if (err) {
                return console.error(err);
            }
            response.end(data, 'utf-8');
        });
    }
    else if(path === '/aapl-2.csv') { 
        response.writeHead(200,{'Content-Type':'text'});
        fs.readFile(__dirname + '/aapl-2.csv', (err, data) => {
            if (err) {
                return console.error(err);
            }
            response.end(data, 'utf-8');
        });
    }
    else { // 매칭되는 주소가 없으면
      response.statusCode = 404; // 404 상태 코드
      response.end('주소가 없습니다');
    }
  }
}).listen(port, hostname);