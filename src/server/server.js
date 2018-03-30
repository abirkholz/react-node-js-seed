import express from 'express';
import path from 'path';

const dist = path.resolve('./dist');
const server = express();

server.use(express.static(dist));

server.get('/', (req, res) => {
  res.sendFile(path.resolve('index.html'));
});

server.listen(3000, () => console.log('running at http://127.0.0.1:3000'));
