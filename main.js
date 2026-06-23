const url = "https://6a29f8bcf59cb8f65f1de3eb.mockapi.io/api/v1/Materiai";

const btnCadastra = document.getElementById("btn-cadastrar");
const tabela = document.getElementById("lista-materiais");

async function carregarTabela() {
    try {
        const respostaApi = await fetch(url);
        
        if (!respostaApi.ok) throw new Error("Erro ao buscar dados");
        
        const dados = await respostaApi.json();

        tabela.innerHTML = "";

        dados.forEach(item => {
            const novaLinha = document.createElement("tr");
            novaLinha.innerHTML = `
            <td>${item.material}</td>
            <td>${item.Qunatidade}</td>
            <td>
                <button class="btn-excluir">Excluir</button>
            </td>
            `;

            const btnExcluir = novaLinha.querySelector(".btn-excluir");
            btnExcluir.addEventListener("click", () => deletarItem(item.Nome));

            tabela.appendChild(novaLinha);
        });
    } catch (erro) {
        console.error("Erro na operação:", erro);
    }
}

btnCadastra.addEventListener('click', async () => {
    const inputMaterial = document.getElementById("input-nome");
    const inputQuantidade = document.getElementById("input-quantidade");

    const material = inputMaterial.value.trim();
    const quantidade = parseInt(inputQuantidade.value);

    if (!quantidade || !material) {
        alert("Preencha todos os campos");
        return;
    }

    const respostaApi = await fetch(url);
    const dados = await respostaApi.json();

    const itemExistente = dados.find(
        item => item.material.toLowerCase() === material.toLowerCase()
    );

    if (itemExistente) {
        const novaQuantidade = parseInt(itemExistente.Qunatidade) + quantidade;

        await fetch(`${url}/${itemExistente.Nome}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                material: itemExistente.material, 
                Qunatidade: novaQuantidade 
            })
        });
    } else {
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ material: material, Qunatidade: quantidade })
        });
    }

    inputMaterial.value = "";
    inputQuantidade.value = "";

    carregarTabela();
});

function validarRetirada(estoqueAtual, quantidadeRetirada) {
    if (quantidadeRetirada <= 0) return false;
    return quantidadeRetirada <= estoqueAtual;
}

carregarTabela();

async function deletarItem(nome) {
    if (!confirm("Tem certeza que deseja excluir esse item?"))
        return;
    try {
        const resposta = await fetch(`${url}/${nome}`, {
            method: 'DELETE'
        });

        if (!resposta.ok) {
            throw new Error("Erro ao deletar item");
        }
        
        carregarTabela();
        
    } catch (erro) {
        console.error("Falha ao deletar o item", erro);
        alert("Falha ao excluir o item");
    }
}