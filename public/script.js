const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");

submitButton.disabled = true;

textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);

function verifyTextLength(e) {
  const textarea = e.target;

  if (textarea.value.length > 200 && textarea.value.length < 100000) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

async function submitData(e) {
  submitButton.classList.add("submit-button--loading");

  const text_to_summarize = textArea.value;

  // Configura o cabeçalho da requisição
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "text_to_summarize": text_to_summarize
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  try {
    // Faz a requisição para o backend
    const response = await fetch('/summarize', requestOptions);
    // Verifica se a resposta está ok
    if (!response.ok) {
      throw new Error('Erro na resposta da API');
    }
    // Converte a resposta para texto e exibe no campo de saída
    const summary = await response.text();
    summarizedTextArea.value = summary;
  } catch (error) {
    console.log('Erro:', error.message);
    alert('Erro ao resumir o texto. Tente novamente.');
  } finally {
    submitButton.classList.remove("submit-button--loading");
  }
}
