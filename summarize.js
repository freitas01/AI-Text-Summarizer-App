// Importa a biblioteca axios
const axios = require('axios');

// Função assíncrona para resumir o texto usando a API do Hugging Face
async function summarizeText(text) {
  // Cria o corpo do objeto com o texto a ser resumido
  let data = {
    "inputs": text,
    "parameters": {
      "max_length": 100,
      "min_length": 30
    }
  };

  // Configuração da requisição para a API
  let config = {
    method: 'post',
    url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env['ACCESS_TOKEN']
    },
    data: data
  };

  try {
    // Faz a requisição para a API
    const response = await axios.request(config);
    // Verifica se a resposta está no formato esperado e retorna o texto resumido
    if (response.data && response.data[0] && response.data[0].summary_text) {
      return response.data[0].summary_text;
    } else {
      throw new Error('Resposta inesperada da API');
    }
  } catch (err) {
    // Captura e exibe erros de resposta ou requisição
    if (err.response) {
      console.error('Erro de resposta da API:', err.response.data);
    } else {
      console.error('Erro ao chamar a API:', err.message);
    }
    throw new Error('Erro ao chamar a API de resumo');
  }
}

// Exporta a função para ser usada em outros arquivos
module.exports = summarizeText;
