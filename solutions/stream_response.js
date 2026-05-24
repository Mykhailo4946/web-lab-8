const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = process.argv[2];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (req.method === 'GET' && parsedUrl.pathname === '/file') {
    const fileName = parsedUrl.query.fileName;

    if (!fileName) {
      res.statusCode = 400;
      return res.end('Missing fileName parameter');
    }

    const filePath = path.join(__dirname, fileName);

    // Перевіряємо, чи існує файл, перед створенням стріму
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        res.statusCode = 400;
        return res.end('File does not exist');
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');

      // Створюємо стрім і перенаправляємо його у відповідь
      const readStream = fs.createReadStream(filePath);
      
      readStream.on('error', (streamErr) => {
        res.statusCode = 500;
        res.end('Stream error');
      });

      readStream.pipe(res);
    });

  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(port);