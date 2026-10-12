const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8081;

const publicPath = path.join(__dirname, 'public');

app.use(express.json());
app.use(express.static(publicPath));

app.get('/api', (req, res) => {
  res.json({
    message: 'API funcionando',
    ok: true,
    timestamp: new Date().toISOString()
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
