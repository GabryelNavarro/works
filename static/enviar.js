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


// Efeito voltar automatico 
  window.addEventListener('DOMContentLoaded', () => {
    const link = document.getElementById('projetosLink');
    let hoverTimer;

    link.addEventListener('mouseenter', () => {
      hoverTimer = setTimeout(() => {
        link.click(); // clica após 4 segundos
      }, 400);
    });

    link.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimer); // cancela se o mouse sair
    });
  });

  window.addEventListener('DOMContentLoaded', () => {
    const elink = document.getElementById('extratoLink');
    let hoverTimer;

    elink.addEventListener('mouseenter', () => {
      hoverTimer = setTimeout(() => {
        elink.click(); // clica após 4 segundos
      }, 400);
    });

    elink.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimer); // cancela se o mouse sair
    });
  });




// preloader

window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  const progressText = document.getElementById('progress-text');

  // Checa se já mostrou o preloader nesta sessão (aba)
  const hasLoadedThisSession = sessionStorage.getItem('preloaderShown');

  if (hasLoadedThisSession) {
    preloader.style.display = 'none'; // não mostra de novo na mesma aba
    return;
  }

  let progress = 0;
  const interval = setInterval(() => {
    progress += 1;
    progressText.textContent = progress + '%';

    if (progress >= 100) {
      clearInterval(interval);
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
        sessionStorage.setItem('preloaderShown', 'true'); // marca para não mostrar de novo na aba
      }, 600);
    }
  }, 30);
});



