let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

//=============================
// Salvar
//=============================

function salvar() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

//=============================
// Adicionar Produto
//=============================

function adicionarProduto() {

    const nome = document.getElementById("nome").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const preco = Number(document.getElementById("preco").value);

    if (nome == "" || quantidade < 0 || preco <= 0) {
        alert("Preencha todos os campos.");
        return;
    }

    produtos.push({
        id: Date.now(),
        nome,
        quantidade,
        preco
    });

    document.getElementById("nome").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("preco").value = "";

    salvar();
    listarProdutos();
}

//=============================
// Listar Produtos
//=============================

function listarProdutos() {

    const pesquisa = document
        .getElementById("pesquisa")
        .value
        .toLowerCase();

    const tbody = document.getElementById("listaProdutos");
    tbody.innerHTML = "";

    let qtdTotal = 0;
    let valorTotal = 0;
    let baixo = 0;

    produtos
    .filter(p => p.nome.toLowerCase().includes(pesquisa))
    .forEach(produto => {

        qtdTotal += produto.quantidade;
        valorTotal += produto.quantidade * produto.preco;

        let status = "";

        if (produto.quantidade <= 5) {
            status = "🔴 Baixo";
            baixo++;
        }
        else if (produto.quantidade <= 15) {
            status = "🟡 Médio";
        }
        else {
            status = "🟢 Normal";
        }

        tbody.innerHTML += `
        <tr>

            <td>${produto.id}</td>

            <td>${produto.nome}</td>

            <td>${produto.quantidade}</td>

            <td>R$ ${produto.preco.toFixed(2)}</td>

            <td>R$ ${(produto.preco * produto.quantidade).toFixed(2)}</td>

            <td>${status}</td>

            <td>

                <button onclick="reposicao(${produto.id})">➕</button>

                <button onclick="baixa(${produto.id})">➖</button>

                <button onclick="editar(${produto.id})">✏️</button>

                <button onclick="excluirProduto(${produto.id})">🗑️</button>

            </td>

        </tr>
        `;
    });

    document.getElementById("totalProdutos").innerText = produtos.length;
    document.getElementById("quantidadeTotal").innerText = qtdTotal;
    document.getElementById("valorEstoque").innerText =
        "R$ " + valorTotal.toFixed(2);
    document.getElementById("estoqueBaixo").innerText = baixo;

    salvar();
}

//=============================
// Reposição
//=============================

function reposicao(id) {

    const produto = produtos.find(p => p.id == id);

    const qtd = Number(prompt("Quantidade para adicionar:"));

    if (isNaN(qtd) || qtd <= 0) return;

    produto.quantidade += qtd;

    listarProdutos();
}

//=============================
// Baixa
//=============================

function baixa(id) {

    const produto = produtos.find(p => p.id == id);

    const qtd = Number(prompt("Quantidade para retirar:"));

    if (isNaN(qtd) || qtd <= 0) return;

    if (qtd > produto.quantidade) {

        alert("Estoque insuficiente.");

        return;
    }

    produto.quantidade -= qtd;

    listarProdutos();
}

//=============================
// Editar
//=============================

function editar(id) {

    const produto = produtos.find(p => p.id == id);

    const nome = prompt("Nome:", produto.nome);

    if (nome == null) return;

    const preco = Number(prompt("Preço:", produto.preco));

    if (isNaN(preco)) return;

    produto.nome = nome;
    produto.preco = preco;

    listarProdutos();
}

//=============================
// Excluir
//=============================

function excluirProduto(id) {

    if (!confirm("Deseja excluir este produto?"))
        return;

    produtos = produtos.filter(p => p.id != id);

    listarProdutos();
}

//=============================
// Produtos de exemplo
//=============================

if (produtos.length == 0) {

    produtos.push(

        {
            id: 1,
            nome: "Notebook Dell",
            quantidade: 10,
            preco: 4200
        },

        {
            id: 2,
            nome: "Mouse Gamer",
            quantidade: 30,
            preco: 150
        },

        {
            id: 3,
            nome: "Teclado Mecânico",
            quantidade: 5,
            preco: 320
        }

    );

}

listarProdutos();
