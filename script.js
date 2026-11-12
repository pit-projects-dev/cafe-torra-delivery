// Base de Produtos de Cafés Especiais (US02 / US10)
const produtos = [
    {
        id: 1,
        nome: "Espresso Intenso Fazenda Santa Rosa",
        categoria: "Espresso",
        intensidade: 9,
        origem: "Sul de Minas Gerais",
        notas: "Chocolate amargo e caramelo",
        preco: 34.90
    },
    {
        id: 2,
        nome: "Grão Especial V60 Flor de Laranjeira",
        categoria: "V60",
        intensidade: 5,
        origem: "Chapada Diamantina - BA",
        notas: "Floral, jasmin e citrus leve",
        preco: 42.00
    },
    {
        id: 3,
        nome: "Prensa Francesa Encorpado Cerrado",
        categoria: "Prensa",
        intensidade: 8,
        origem: "Cerrado Mineiro",
        notas: "Castanhas tostadas e cacau",
        preco: 38.50
    },
    {
        id: 4,
        nome: "Blend Alta Intensidade Torra Escura",
        categoria: "Alta Intensidade",
        intensidade: 10,
        origem: "Mogiana Paulista",
        notas: "Fumaça, tabaco e especiarias",
        preco: 39.90
    }
];

let carrinho = [];
let notaSelecionada = 5;

// Renderizar Produtos na Vitrine
function renderizarProdutos(lista) {
    const grid = document.getElementById("grid-produtos");
    if (!grid) return;
    
    grid.innerHTML = "";
    lista.forEach(produto => {
        const card = document.createElement("div");
        card.className = "produto-card";
        card.innerHTML = `
            <h3>${produto.nome}</h3>
            <p><strong>Origem:</strong> ${produto.origem}</p>
            <p><strong>Notas:</strong> ${produto.notas}</p>
            <p class="preco">R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
            <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
        `;
        grid.appendChild(card);
    });
}

// Filtrar Produtos (US10)
function filtrarProdutos(categoria) {
    document.querySelectorAll(".filtro-btn").forEach(btn => btn.classList.remove("ativo"));
    event.target.classList.add("ativo");

    if (categoria === 'todos') {
        renderizarProdutos(produtos);
    } else if (categoria === 'Intensidade Alta') {
        const filtrados = produtos.filter(p => p.intensidade >= 8);
        renderizarProdutos(filtrados);
    } else {
        const filtrados = produtos.filter(p => p.categoria === categoria);
        renderizarProdutos(filtrados);
    }
}

// Carrinho de Compras (US03 / US04)
function toggleCarrinho() {
    const drawer = document.getElementById("drawer-carrinho");
    drawer.classList.toggle("ativo");
}

function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    carrinho.push(produto);
    atualizarCarrinho();
    toggleCarrinho();
}

function atualizarCarrinho() {
    const itensContainer = document.getElementById("drawer-items");
    const contador = document.getElementById("contador-carrinho");
    contador.innerText = carrinho.length;

    itensContainer.innerHTML = "";
    let subtotal = 0;

    carrinho.forEach((item, index) => {
        subtotal += item.preco;
        const div = document.createElement("div");
        div.style.cssText = "display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.9rem; border-bottom: 1px solid #eee; padding-bottom: 5px;";
        div.innerHTML = `
            <span>${item.nome}</span>
            <span>R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
        `;
        itensContainer.appendChild(div);
    });

    document.getElementById("val-subtotal").innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    document.getElementById("val-total").innerText = `R$ ${(subtotal + 15).toFixed(2).replace('.', ',')}`;
}

// Cupons e Checkout Pix (US05 / US13)
function aplicarCupom() {
    const cupom = document.getElementById("input-cupom").value.trim().toUpperCase();
    if (cupom === "PRIMEIRA TORRA") {
        alert("Cupom aplicado com sucesso! 10% de desconto.");
        document.getElementById("val-desconto").innerText = "R$ 5,00";
    } else {
        alert("Cupom inválido.");
    }
}

function finalizarCheckout() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    document.getElementById("modal-pix").classList.add("ativo");
}

function fecharModalPix() {
    document.getElementById("modal-pix").classList.remove("ativo");
}

function copiarChavePix() {
    alert("Chave Pix copiada com sucesso!");
}

function simularConfirmacaoPix() {
    alert("Pagamento aprovado com sucesso! Pedido enviado para a cafeteria.");
    carrinho = [];
    atualizarCarrinho();
    fecharModalPix();
    toggleCarrinho();
}

// Lógica de Avaliação (US11)
function selecionarEstrela(nota) {
    notaSelecionada = nota;
    let estrelas = document.querySelectorAll("#grupo-estrelas i");
    estrelas.forEach((estrela, index) => {
        if (index < nota) {
            estrela.classList.add("selecionada");
        } else {
            estrela.classList.remove("selecionada");
        }
    });
}

function enviarAvaliacao() {
    let comentario = document.getElementById("comentario-aval");
    if (comentario.value.trim() === "") {
        comentario.style.border = "2px solid #e74c3c";
        alert("Por favor, escreva um comentário antes de enviar a avaliação.");
        return;
    }
    comentario.style.border = "1px solid #e6d7cd";
    alert(`Obrigado! Sua avaliação de ${notaSelecionada} estrelas foi enviada com sucesso.`);
    comentario.value = "";
    comentario.blur();
    selecionarEstrela(5);
}

// Inicializar vitrine ao carregar a página
window.onload = function() {
    renderizarProdutos(produtos);
};
