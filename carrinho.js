const carrinho = {};
let desconto = 0;
const FRETE_FIXO = 15.0;

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
    const total = subtotal - valorDesconto + FRETE_FIXO;

    document.getElementById("subtotal").textContent = `R$ ${subtotal.toFixed(2)}`;
    document.getElementById("desconto").textContent = `- R$ ${valorDesconto.toFixed(2)}`;
    document.getElementById("total").textContent = `R$ ${total.toFixed(2)}`;
}

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

document.getElementById("limpar").addEventListener("click", () => {
    for (const id in carrinho) {
      carrinho[id].quantidade = 0;
    }
    document.querySelectorAll(".quantidade").forEach((el) => (el.textContent = "0"));
    document.querySelectorAll(".valor-produto").forEach((el) => (el.textContent = "R$ 0.00"));
    atualizarResumo();
  });