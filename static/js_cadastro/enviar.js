document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form");

  form.addEventListener("submit", function (event) {
      const nomeProjeto = document.getElementById("nome_projeto").value.trim();
      const tipoProjeto = document.getElementById("tipo_projeto").value;

      // Validação
      if (nomeProjeto === "" || tipoProjeto === "") {
          alert("Por favor, preencha todos os campos!");
          event.preventDefault(); // Impede o envio do formulário
      } else {
          alert("Projeto enviado com sucesso!");
      }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById('orcamento');

  input.addEventListener('input', function (e) {
    let value = e.target.value;

    // Salva posição do cursor
    let cursorPosition = e.target.selectionStart;

    // Remove tudo que não é número
    let numbers = value.replace(/\D/g, '');

    if (numbers.length === 0) {
      e.target.value = '';
      return;
    }

    // Converte para número com 2 casas decimais
    let numberValue = parseInt(numbers, 10) / 100;

    // Formata para Real (R$)
    let formattedValue = numberValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    e.target.value = formattedValue;

    // Ajusta cursor para posição correta
    // (simplificado: coloca no final do texto, mas evita pulos extremos)
    e.target.setSelectionRange(e.target.value.length, e.target.value.length);
  });
});


