const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.argv[2];

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/upload') {
    const filePath = path.join(__dirname, 'upload.txt');
    const writeStream = fs.createWriteStream(filePath);

    // Перенаправляємо стрім запиту (req) у стрім запису у файл
    req.pipe(writeStream);

    // Чекаємо, поки файл повністю запишеться
    writeStream.on('finish', () => {
      res.statusCode = 200;
      res.end('Upload successful');
    });

    writeStream.on('error', (err) => {
      res.statusCode = 500;
      res.end('File write error');
    });

  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(port);