const http = require('http');

const PORT = process.env.PORT || 5678;
const PATH = '/webhook/2c8e40bc-d18d-458e-9d02-6ca7be1eb19c/chat';

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === PATH) {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ response: 'Consulta procesada correctamente.' }));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = server;
