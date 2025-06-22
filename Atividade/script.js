const inputValor = document.getElementById('valor');
const button = document.getElementById("button-submit");
const clientes = document.getElementById("clientes");
const metodo = document.getElementById("método");

// Formata o valor enquanto digita
inputValor.addEventListener('input', function () {
  let valor = inputValor.value;

  valor = valor.replace(/\D/g, ''); // Remove tudo que não for número
  valor = (parseInt(valor) / 100).toFixed(2); // Centavos

  inputValor.value = parseFloat(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
});

// Função para limpar e converter o valor R$ para número
function limparValorMonetario(valorTexto) {
  let limpo = valorTexto.replace(/\D/g, '');
  return parseFloat(limpo) / 100;
}

// Evento do botão
button.addEventListener("click", function (event) {
  event.preventDefault();

  const numClientes = parseInt(clientes.value);
  const valorTotal = limparValorMonetario(inputValor.value); // Usa a função para limpar
  const formaPagamento = metodo.value;

  // Validação
  if (isNaN(numClientes) || isNaN(valorTotal) || numClientes <= 0) {
    alert("Preencha os campos corretamente!");
    return;
  }

  let valorComDesconto = valorTotal;

  // Aplica desconto se for pix ou dinheiro (minúsculas!)
  if (formaPagamento === "pix" || formaPagamento === "dinheiro") {
    valorComDesconto = valorTotal * 0.90;
  }

  const valorPorPessoa = valorComDesconto / numClientes;

  alert(
    `Método de pagamento: ${formaPagamento.toUpperCase()}\n` +
    `Valor com desconto (se aplicável): R$ ${valorComDesconto.toFixed(2)}\n` +
    `Valor por cliente: R$ ${valorPorPessoa.toFixed(2)}`
  );
});