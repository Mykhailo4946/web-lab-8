const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { Transform } = require('stream');

const port = process.argv[2];

// Створюємо власний Transform стрім
const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    // Перетворюємо чанк у рядок, робимо великі літери
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (req.method === 'GET' && parsedUrl.pathname === '/upper') {
    const fileName = parsedUrl.query.fileName;

    if (!fileName) {
      res.statusCode = 400;
      return res.end('Missing fileName');
    }

    const filePath = path.join(__dirname, fileName);

    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        res.statusCode = 400;
        return res.end('File not found');
      }

      res.statusCode = 200;
      
      const readStream = fs.createReadStream(filePath);
      
      // Направляємо: Файл -> Трансформер -> Відповідь
      readStream.pipe(upperCaseTransform).pipe(res);
    });

  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(port);