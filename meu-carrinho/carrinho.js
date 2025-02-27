const carrinho = {};
let desconto = 0;
let SUB_TOTAL = 0;
let VALOR_DESCONTO = 0
let TOTAL = 0;
const FRETE_FIXO = 15.0;
let MENSAGEM_COMPRA_FINALIZADA = "";

function atualizarProduto(produto, operacao) {
  const id = produto.dataset.id;
  const preco = parseFloat(produto.dataset.preco);
  const valorProduto = produto.querySelector(".valor-produto");
  const quantidadeSpan = produto.querySelector(".quantidade");

  if (!carrinho[id]) {
    carrinho[id] = { quantidade: 0, preco };
  }

  if (operacao === "add") {
    carrinho[id].quantidade++;
  } else if (operacao === "remove" && carrinho[id].quantidade > 0) {
    carrinho[id].quantidade--;
  }

  const subtotal = carrinho[id].quantidade * preco;

  valorProduto.textContent = `R$ ${subtotal.toFixed(2)}`;
  quantidadeSpan.textContent = carrinho[id].quantidade;

  atualizarResumo();
}

function atualizarResumo() {
    const subtotal = Object.values(carrinho).reduce((acc, item) => acc + item.quantidade * item.preco, 0);
    const valorDesconto = subtotal * desconto;
    const frete = subtotal > 99.99 ? 0 : FRETE_FIXO;
    const total = subtotal - valorDesconto + frete;

  
    document.getElementById("subtotal").textContent = `R$ ${subtotal.toFixed(2)}`;
    document.getElementById("desconto").textContent = `- R$ ${valorDesconto.toFixed(2)}`;
    document.getElementById("frete").textContent = `R$ ${frete.toFixed(2)}`;
    document.getElementById("total").textContent = `R$ ${total.toFixed(2)}`;

    SUB_TOTAL = subtotal;
    VALOR_DESCONTO = valorDesconto;
    TOTAL = total;
    MENSAGEM_COMPRA_FINALIZADA = criarMensagemCompraFinalizada(subtotal, valorDesconto, frete, total)
}

function criarMensagemCompraFinalizada(subtotal, valorDesconto, frete, total) {
  const mensagem = `
  Parabéns! Sua compra foi realizada com sucesso.

  Detalhes do pedido:
  - Subtotal: R$ ${subtotal.toFixed(2)}
  - Desconto: R$ ${valorDesconto.toFixed(2)}
  - Frete: R$ ${frete.toFixed(2)}
  - Total: R$ ${total.toFixed(2)}

  Obrigado por comprar conosco!
  `;

  return mensagem;
}

function exibirMensagem(mensagem) {
  document.getElementById("comprar").addEventListener("click", (e) => {
    alert(mensagem);
    return;
  })
}

function carrinhoVazio() {
  if (SUB_TOTAL === 0) {
    return true;
  } 
}

function exibirModal(mensagem) {
  let mensagemCarrinhoVazio = "";

  if (carrinhoVazio()) {
    mensagem = `Seu carrinho está vazio. 
    
                Adicione produtos antes de finalizar a compra.`;
    mensagemCarrinhoVazio = "Carrinho vazio :(";
  }

  document.getElementById("titulo-modal").innerText = mensagemCarrinhoVazio;
  document.getElementById("detalhes-compra").innerText = mensagem;
  document.getElementById("modal").classList.add("active");
}

function fecharModal() {
  document.getElementById("modal").classList.remove("active");
}

function resetarCampos() {
  desconto = 0;
  SUB_TOTAL = 0;
  VALOR_DESCONTO = 0;
  TOTAL = 0;
  MENSAGEM_COMPRA_FINALIZADA = "";
}

function comprar() {
  exibirModal(MENSAGEM_COMPRA_FINALIZADA);
  resetarCampos();
}

document.getElementById("comprar").addEventListener("click", () => {
   comprar();
   return;
});


document.getElementById("produtos").addEventListener("click", (e) => {
  if (e.target.classList.contains("add")) {
    const produto = e.target.closest(".produto");
    atualizarProduto(produto, "add");
  }

  if (e.target.classList.contains("remove")) {
    const produto = e.target.closest(".produto");
    atualizarProduto(produto, "remove");
  }
});

document.getElementById("cupom").addEventListener("blur", (e) => {
  const codigo = e.target.value.trim();
  if (codigo === "DESC10") {
    desconto = 0.1;
  } else if (codigo === "DESC20") {
    desconto = 0.2; 
  } else {
    desconto = 0;
  }
  atualizarResumo();
});

// document.getElementById("limpar").addEventListener("click", () => {
//     for (const id in carrinho) {
//       carrinho[id].quantidade = 0;
//     }
//     document.querySelectorAll(".quantidade").forEach((el) => (el.textContent = "0"));
//     document.querySelectorAll(".valor-produto").forEach((el) => (el.textContent = "R$ 0.00"));
//     atualizarResumo();   
// }); 