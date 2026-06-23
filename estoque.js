const url = "https://6a29f8bcf59cb8f65f1de3eb.mockapi.io/api/v1/Materiai";
const tabela = document.getElementById("lista-materiais");
const totalSpan = document.getElementById("total-itens");
const inputBusca = document.getElementById("input-busca");

async function carregarDashboard() {
    if (!tabela) return;
    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        tabela.innerHTML = "";
        let somaTotal = 0;

        dados.forEach(item => {
            const quantidade = Number(item.Qunatidade);
            somaTotal += quantidade;

            const novaLinha = document.createElement("tr");
            if (quantidade < 10) {
                novaLinha.classList.add("estoque-critico");
            }
            novaLinha.innerHTML = `
                <td>${item.material}</td>
                <td class="${quantidade < 10 ? 'alerta-baixo' : ''}">${quantidade}</td>
            `;
            tabela.appendChild(novaLinha);

            if (quantidade < 10) {
                alert(`⚠️ Atenção: "${item.material}" está com apenas ${quantidade} unidade(s) em estoque!`);
            }
        });

        if (totalSpan) totalSpan.textContent = somaTotal;
    } catch (erro) {
        console.error("Erro ao carregar:", erro);
    }
}

if (inputBusca) {
    inputBusca.addEventListener("change", async () => {
        const materialSelecionado = inputBusca.value;

        try {
            const resposta = await fetch(url);
            const dados = await resposta.json();
            const item = dados.find(i => i.material === materialSelecionado);

            if (item) {
                alert(`🔍 Material: ${item.material}\n📦 Quantidade em estoque: ${item.Qunatidade}`);
            } else {
                alert(`Material "${materialSelecionado}" não encontrado no estoque.`);
            }
        } catch (erro) {
            console.error("Erro ao pesquisar:", erro);
        }
    });
}

carregarDashboard();