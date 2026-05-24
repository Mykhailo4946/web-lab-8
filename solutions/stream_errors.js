const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = process.argv[2];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (req.method === 'GET' && parsedUrl.pathname === '/missing-file') {
    const fileName = parsedUrl.query.fileName;

    if (!fileName) {
      res.statusCode = 400;
      return res.end('Missing fileName');
    }

    const filePath = path.join(__dirname, fileName);
    const readStream = fs.createReadStream(filePath);

    // ОБОВ'ЯЗКОВО перехоплюємо помилку тут
    readStream.on('error', (err) => {
      res.statusCode = 500;
      // Віддаємо безпечне повідомлення, не розкриваючи шлях до файлу або stack trace
      res.end('Internal Server Error'); 
    });

    // Якщо все добре, стрімимо дані
    readStream.on('open', () => {
      res.statusCode = 200;
      readStream.pipe(res);
    });

  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(port);