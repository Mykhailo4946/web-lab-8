const http = require('http');

const port = process.argv[2];

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/count') {
    let bytes = 0;
    let chunks = 0;

    // Спрацьовує при отриманні кожного нового шматочка даних
    req.on('data', (chunk) => {
      chunks += 1;
      bytes += chunk.length;
    });

    // Спрацьовує, коли всі дані отримані
    req.on('end', () => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ bytes, chunks }));
    });

    req.on('error', () => {
      res.statusCode = 500;
      res.end('Stream error');
    });

  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(port);