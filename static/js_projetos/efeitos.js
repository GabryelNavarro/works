window.addEventListener('DOMContentLoaded', () => {
    const img = document.querySelector('.imgv'); // pega a imagem
    const link = document.getElementById('backLink'); // pega o <a>
    let hoverTimer;

    img.addEventListener('mouseenter', () => {
      hoverTimer = setTimeout(() => {
        link.click(); // clica após 3 segundos
      },260);
    });

    img.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimer); // cancela se o mouse sair
    });
  });


document.addEventListener("DOMContentLoaded", function () {
  const input = document.querySelector("#filtroNome");
  const rows = document.querySelectorAll("#dados-projetos tr");

  input.addEventListener("input", function () {
    const termo = input.value.toLowerCase();

    rows.forEach((row) => {
      const texto = row.textContent.toLowerCase();
      row.style.display = texto.includes(termo) ? "" : "none";
    });
  });
});


  const filtroInput = document.getElementById('filtroNome');
    const tabela = document.getElementById('tabelaProjetos');
    const totalTd = document.getElementById('totalOrcamento');

    // Função para converter string de valor "1.234,56" para número 1234.56
    function parseValor(valorStr) {
      if (!valorStr) return 0;
      return parseFloat(valorStr.replace(/\./g, '').replace(',', '.')) || 0;
    }

    // Função para formatar número para string "1.234,56"
    function formatValor(valorNum) {
      return valorNum.toFixed(2).replace('.', ',');
    }

    function filtrarESomar() {
      const filtro = filtroInput.value.toLowerCase();

      let total = 0;
      // Iterar linhas do corpo da tabela (tbody)
      Array.from(tabela.tBodies[0].rows).forEach(row => {
        const nomeProjeto = row.cells[0].textContent.toLowerCase();

        if (nomeProjeto.includes(filtro)) {
          row.style.display = '';
          // A coluna do orçamento está na posição que depende da ordem do seu cabeçalho,
          // aqui vou assumir que a coluna 'orcamento' é a que tem valor numérico e está sempre presente.
          // Ajuste se necessário!
          const orcamentoCell = Array.from(row.cells).find(cell => {
            // tenta identificar célula contendo número no formato brasileiro
            return cell.textContent.match(/^\d{1,3}(\.\d{3})*(,\d{2})?$/);
          });
          if (orcamentoCell) {
            total += parseValor(orcamentoCell.textContent.trim());
          } else {
            // se não achou, tenta a célula da coluna orcamento pelo índice
            // aqui, por segurança, assumo a coluna 2 (terceira)
            total += parseValor(row.cells[2]?.textContent.trim());
          }
        } else {
          row.style.display = 'none';
        }
      });

      totalTd.textContent = 'R$ ' + formatValor(total);
    }

    filtroInput.addEventListener('input', filtrarESomar);
    filtrarESomar();





    