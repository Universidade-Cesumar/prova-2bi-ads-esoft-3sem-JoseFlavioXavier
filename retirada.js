const url = "https://6a29f8bcf59cb8f65f1de3eb.mockapi.io/api/v1/Materiai";
const tabela = document.getElementById("lista-materiais");
const inputRetirada = document.getElementById("input-retirada");

function validarRetirada(estoqueAtual, quantidadeRetirada) {
    if (quantidadeRetirada <= 0) return false;
    return quantidadeRetirada <= estoqueAtual;
}

async function carregarTabelaRetirada() {
    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();

        tabela.innerHTML = "";

        dados.forEach(item => {
            const novaLinha = document.createElement("tr");
            novaLinha.innerHTML = `
                <td>${item.material}</td>
                <td>${item.Qunatidade}</td>
                <td>
                    <button class="btn-baixar">Retirar</button>
                    <button class="btn-excluir">Excluir</button>
                </td>
            `;

            // Botão de retirada (PUT)
            const btnBaixar = novaLinha.querySelector(".btn-baixar");
            btnBaixar.addEventListener("click", async () => {
                const qtdRetirada = parseInt(inputRetirada.value);

                if (!qtdRetirada || isNaN(qtdRetirada)) {
                    alert("Insira uma quantidade para retirar!");
                    return;
                }

                const estoqueAtual = parseInt(item.Qunatidade);

                if (validarRetirada(estoqueAtual, qtdRetirada)) {
                    const novaQuantidade = estoqueAtual - qtdRetirada;

                    await fetch(`${url}/${item.Nome}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ Qunatidade: novaQuantidade })
                    });

                    alert(`Retirada de ${qtdRetirada} unidade(s) de "${item.material}" realizada!`);
                    inputRetirada.value = "";
                    carregarTabelaRetirada();
                } else {
                    alert("Quantidade insuficiente ou inválida!");
                }
            });

            // Botão de excluir (DELETE)
            const btnExcluir = novaLinha.querySelector(".btn-excluir");
            btnExcluir.addEventListener("click", async () => {
                if (!confirm(`Deseja excluir "${item.material}"?`)) return;

                try {
                    const resposta = await fetch(`${url}/${item.Nome}`, {
                        method: 'DELETE'
                    });

                    if (!resposta.ok) throw new Error("Erro ao deletar");

                    carregarTabelaRetirada();
                } catch (erro) {
                    console.error("Falha ao deletar:", erro);
                    alert("Falha ao excluir o item!");
                }
            });

            tabela.appendChild(novaLinha);
        });
    } catch (erro) {
        console.error("Erro ao carregar tabela:", erro);
    }
}

carregarTabelaRetirada();