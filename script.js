// Base de Produtos de Cafés Especiais (Alinhado ao PIT I)
const produtos = [
    { id: 1, nome: "Etiópia Yirgacheffe", categoria: "V60", intensidade: 3, preco: 48.00, origem: "Etiópia", notas: ["Jasmim", "Bergamota", "Pêssego"] },
    { id: 2, nome: "Brasil Cerrado", categoria: "Espresso", intensidade: 4, preco: 36.00, origem: "Minas Gerais, BR", notas: ["Chocolate", "Avelã"] },
    { id: 3, nome: "Colômbia Huila", categoria: "Prensa", intensidade: 4, preco: 52.00, origem: "Huila, Colômbia", notas: ["Caramelo", "Frutas Vermelhas"] },
    { id: 4, nome: "Sumatra Mandheling", categoria: "Intensidade Alta", intensidade: 5, preco: 44.00, origem: "Sumatra, Indonésia", notas: ["Tabaco", "Terra", "Especiarias"] }
];

let carrinho = [];
let descontoAplicado = 0;

document.addEventListener("DOMContentLoaded", () => {
    renderizarProdutos(produtos);
});

function renderizarProdutos(lista) {
    const grid = document.getElementById("grid-produtos");
    grid.innerHTML = "";

    lista.forEach(prod => {
        let tagsHtml = prod.notas.map(n => `<span class="tag">${n}</span>`).join("");
        let card = document.createElement("div");
        card.className = "produto-card";
        card.innerHTML = `
            <div class="produto-img"><i class="fa-solid fa-mug-saucer"></i></div>
            <div class="produto-info">
                <h3>${prod.nome}</h3>
                <p>Origem: ${prod.origem}</p>
                <div class="notas-tags">${tagsHtml}</div>
            </div>
            <div class="card-footer">
                <span class="preco">R$ ${prod.preco.toFixed(2)}</span>
                <button class="btn-add" onclick="adicionarCarrinho(${prod.id})">Adicionar</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filtrarProdutos(criterio) {
    // Atualiza botões ativos
    document.querySelectorAll(".filtro-btn").forEach(btn => btn.classList.remove("ativo"));
    event.target.classList.add("ativo");

    if (criterio === 'todos') {
        renderizarProdutos(produtos);
    } else if (criterio === 'Intensidade Alta') {
        let filtrados = produtos.filter(p => p.intensidade >= 5);
        renderizarProdutos(filtrados);
    } else {
        let filtrados = produtos.filter(p => p.categoria === criterio);
        renderizarProdutos(filtrados);
    }
}

function toggleCarrinho() {
    document.getElementById("drawer-carrinho").classList.toggle("aberto");
}

function adicionarCarrinho(id) {
    let produto = produtos.find(p => p.id === id);
    let itemExistente = carrinho.find(i => i.id === id);

    if (itemExistente) {
        itemExistente.qtd++;
    } else {
        carrinho.push({ ...produto, qtd: 1 });
    }
    atualizarCarrinho();
    toggleCarrinho();
}

function atualizarCarrinho() {
    let itemsContainer = document.getElementById("drawer-items");
    itemsContainer.innerHTML = "";
    let subtotal = 0;
    let qtdTotal = 0;

    carrinho.forEach((item, index) => {
        subtotal += item.preco * item.qtd;
        qtdTotal += item.qtd;

        let div = document.createElement("div");
        div.className = "carrinho-item";
        div.innerHTML = `
            <div>
                <h4>${item.nome}</h4>
                <p>R$ ${item.preco.toFixed(2)} x ${item.qtd}</p>
            </div>
            <button onclick="removerItem(${index})" style="background:none;border:none;color:#e74c3c;cursor:pointer;"><i class="fa-solid fa-trash"></i></button>
        `;
        itemsContainer.appendChild(div);
    });

    document.getElementById("contador-carrinho").innerText = qtdTotal;
    document.getElementById("val-subtotal").innerText = `R$ ${subtotal.toFixed(2)}`;
    
    let frete = subtotal > 0 ? 15.00 : 0.00;
    document.getElementById("val-frete").innerText = `R$ ${frete.toFixed(2)}`;
    
    let total = subtotal + frete - descontoAplicado;
    document.getElementById("val-total").innerText = `R$ ${total > 0 ? total.toFixed(2) : '0,00'}`;
}

function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function aplicarCupom() {
    let codigo = document.getElementById("input-cupom").value.trim().toUpperCase();
    if (codigo === "PRIMEIRA TORRA") {
        descontoAplicado = 12.00;
        document.getElementById("val-desconto").innerText = `- R$ 12,00`;
        alert("Cupom 'PRIMEIRA TORRA' aplicado com sucesso!");
        atualizarCarrinho();
    } else {
        alert("Cupom inválido ou expirado.");
    }
}

function finalizarCheckout() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    toggleCarrinho();
    document.getElementById("modal-pix").classList.add("ativo");
}

function fecharModalPix() {
    document.getElementById("modal-pix").classList.remove("ativo");
}

function copiarChavePix() {
    let inputChave = document.getElementById("chave-pix-input");
    inputChave.select();
    navigator.clipboard.writeText(inputChave.value);
    alert("Chave PIX copiada para a área de transferência!");
}

function simularConfirmacaoPix() {
    alert("Pagamento PIX confirmado com sucesso! Seu pedido foi encaminhado para a torrefação.");
    carrinho = [];
    descontoAplicado = 0;
    atualizarCarrinho();
    fecharModalPix();
}
