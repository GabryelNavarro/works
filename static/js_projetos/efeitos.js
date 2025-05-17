window.addEventListener('DOMContentLoaded', () => {
  const img = document.querySelector('.imgv'); 
  const link = document.getElementById('backLink'); 
  let hoverTimer;

  if (img && link) {
    img.addEventListener('mouseenter', () => {
      hoverTimer = setTimeout(() => {
        link.click(); 
      }, 260);
    });

    img.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimer); 
    });
  }

  const inputNome = document.querySelector("#filtroNome");
  const inputProjeto = document.querySelector("#filtroProjeto");
  const inputCategoriaProjeto = document.querySelector("#filtroCategoriaProjeto");

  const dataInicioInput = document.getElementById('dataInicio');
  const dataFimInput = document.getElementById('dataFim');

  if (dataInicioInput) dataInicioInput.addEventListener('input', aplicarFiltros);
  if (dataFimInput) dataFimInput.addEventListener('input', aplicarFiltros);

  if (inputNome) inputNome.addEventListener("input", aplicarFiltros);
  if (inputProjeto) inputProjeto.addEventListener("input", aplicarFiltros);
  if (inputCategoriaProjeto) inputCategoriaProjeto.addEventListener("input", aplicarFiltros);

  function aplicarFiltros() {
    const termoNome = inputNome ? inputNome.value.toLowerCase() : '';
    const termoProjeto = inputProjeto ? inputProjeto.value.toLowerCase() : '';
    const termoCategoriaProjeto = inputCategoriaProjeto ? inputCategoriaProjeto.value.toLowerCase() : '';

    const dataInicio = dataInicioInput ? dataInicioInput.value : null;
    const dataFim = dataFimInput ? dataFimInput.value : null;

    const tabela = document.querySelector('table tbody#dados-projetos');
    if (!tabela) return;
    const linhas = tabela.getElementsByTagName('tr');

    const inicioTime = dataInicio ? new Date(dataInicio).getTime() : null;
    const fimTime = dataFim ? new Date(dataFim + 'T23:59:59').getTime() : null;

    let somaOrcamento = 0;

    for (let i = 0; i < linhas.length; i++) {
      const linha = linhas[i];

      const projetoColuna = linha.cells[0]?.textContent.toLowerCase() || '';
      const categoriaProjetoColuna = linha.cells[1]?.textContent.toLowerCase() || '';
      const celulaValor = linha.cells[2];
      const celulaData = linha.cells[3];

      let mostrar = true;

      if (termoProjeto && !projetoColuna.includes(termoProjeto)) mostrar = false;
      if (termoNome && !linha.textContent.toLowerCase().includes(termoNome)) mostrar = false;
      if (termoCategoriaProjeto && !categoriaProjetoColuna.includes(termoCategoriaProjeto)) mostrar = false;

      if (celulaData) {
        const dataTexto = celulaData.textContent.trim();
        const partes = dataTexto.split('/');
        if (partes.length === 3) {
          const dataObj = new Date(partes[2], partes[1] - 1, partes[0]);
          const dataTime = dataObj.getTime();

          if (inicioTime && dataTime < inicioTime) mostrar = false;
          if (fimTime && dataTime > fimTime) mostrar = false;
        } else {
          mostrar = false;
        }
      } else {
        mostrar = false;
      }

      linha.style.display = mostrar ? '' : 'none';

      if (mostrar && celulaValor) {
        const valorTexto = celulaValor.innerText.replace(/[R$\s.]/g, '').replace(',', '.');
        const valor = parseFloat(valorTexto) || 0;
        somaOrcamento += valor;
      }
    }

    const totalSpan = document.getElementById('totalOrcamento');
    if (totalSpan) {
      totalSpan.textContent = `R$ ${somaOrcamento.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  }

  aplicarFiltros(); // Aplica ao carregar

  const btnLimpar = document.getElementById('btnLimparFiltros');

  if (btnLimpar) {
    btnLimpar.addEventListener('click', () => {
      if (inputNome) inputNome.value = '';
      if (inputProjeto) inputProjeto.value = '';
      if (inputCategoriaProjeto) inputCategoriaProjeto.value = '';
      if (dataInicioInput) dataInicioInput.value = '';
      if (dataFimInput) dataFimInput.value = '';
      aplicarFiltros();
    });
  }
});
