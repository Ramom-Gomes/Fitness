import React, { useState } from 'react';

const Gpt3_5Request = () => {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const apiKey = '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';

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleButtonClick = () => {
    if (isButtonDisabled) return; // Impede mais de uma solicitação dentro de 100 segundos

    setIsButtonDisabled(true);
    fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: inputText,
        max_tokens: 100,
      }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao acessar a API da OpenAI.');
      }
      return response.json();
    })
    .then((data) => {
      setResponseText(data.choices[0].text);
      setTimeout(() => setIsButtonDisabled(false), 100000); // Habilita o botão novamente após 100 segundos (100000 milissegundos)
    })
    .catch((error) => {
      console.error('Erro ao acessar a API da OpenAI:', error);
      setResponseText('Ocorreu um erro ao processar a solicitação.');
      setIsButtonDisabled(false); // Habilita o botão novamente em caso de erro
    });
  };

  return (
    <div>
      <h1>sim</h1>
    </div>
  );
}

export default Gpt3_5Request;
