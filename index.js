const express = require('express');
const summarizeText = require('./summarize.js'); // Importa a função summarizeText

const app = express();
const port = 3000;

// Parses JSON bodies (as sent by API clients)
app.use(express.json());

// Serves static files from the 'public' directory
app.use(express.static('public'));

// Handle POST requests to the '/summarize' endpoint
app.post('/summarize', (req, res) => {
  const text = req.body.text_to_summarize;

  // Verifica se o texto foi fornecido e tem o comprimento mínimo
  if (!text || text.length < 200) {
    return res.status(400).send('O texto deve ter pelo menos 200 caracteres');
  }

  summarizeText(text)
    .then(response => {
      res.send(response); // Envia o resumo como resposta
    })
    .catch(error => {
      console.error('Erro ao gerar o resumo:', error.message);
      res.status(500).send('Erro ao gerar resumo');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
