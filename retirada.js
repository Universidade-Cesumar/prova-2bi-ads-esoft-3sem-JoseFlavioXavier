const url = "https://6a29f8bcf59cb8f65f1de3eb.mockapi.io/api/v1/Materiai";
const btnConfirmaRetirada = document.getElementById("btn-exclui");
const tabela = document.getElementById("corpo-tabela");
const inputQuantidade = document.getElementById("input-quantidade");

inputQuantidade.addEventListener('blur', () => {
    if(inputQuantidade.value > 0){
        alert("Pressione o botão para finalizar a operação")
    }
});

async function carregarTabelaRetirada() {
    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();

        tabela.innerHTML = "";
        dados.forEach(item => {
            const novaLinha = document.createElement("tr"); 
            novaLinha.innerHTML = `
                <td>${item.material}</td>
                <td>${item.quantidade}</td>
                <td>
                    <input type="number" class="input-retirada" placeholder="Qtd">
                    <button class="btn-baixar" data-id="${item.id}">Baixar</button>
                    <button class="btn-excluir" data-id="${item.id}">Excluir</button>
                </td>
            `;
            tabela.appendChild(novaLinha);
        });
    } catch (erro) {
        console.error("Erro ao carregar tabela", erro);
    }
}

function validarRetirada(estoqueAtual, quantidadeRetirada){
    if(quantidadeRetirada <= 0) return false;
    return quantidadeRetirada <= estoqueAtual;
}

if(btnConfirmaRetirada){
    btnConfirmaRetirada.addEventListener('click', async () => {
        const materialSelecionado = document.getElementById("input-nome").value;
        const qdtRetirada = parseInt(document.getElementById("input-quantidade").value);

        if(!materialSelecionado || isNaN(qdtRetirada)){
            alert("Selecione um material e insira a quantidade")
            return;
        }

        const resposta = await fetch(url);
        const lista = await resposta.json();
        const item = lista.find(i => i.material === materialSelecionado);

        if(!item){
            alert("Material não encontrado");
            return;
        }

        const estoqueAtual = parseInt(item.quantidade);

        if(validarRetirada(estoqueAtual, qdtRetirada)){
            const novaQuantidade = estoqueAtual - qdtRetirada;
            await fetch(`${url}/${item.Nome}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantidade: novaQuantidade })
            });

            alert("Retirada feita com sucesso!");
            carregarTabelaRetirada();
        } else {
            alert("Quantidade insuficinete, favor verificar o estoque");
        }
    });
}

carregarTabelaRetirada();