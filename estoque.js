const url = "https://6a29f8bcf59cb8f65f1de3eb.mockapi.io/api/v1/Materiai";
const tabela = document.getElementById("lista-materiais");
const totalSpan = document.getElementById("total-itens");

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
            novaLinha.innerHTML = `
                <td>${item.material}</td>
                <td class="${quantidade < 10 ? 'alerta-baixo' : ''}">${quantidade}</td>
            `;
            tabela.appendChild(novaLinha);

            // Alerta para itens com menos de 10 unidades
            if (quantidade < 10) {
                alert(`⚠️ Atenção: "${item.material}" está com apenas ${quantidade} unidade(s) em estoque!`);
            }
        });

        if (totalSpan) totalSpan.textContent = somaTotal;
    } catch (erro) {
        console.error("Erro ao carregar:", erro);
    }
}

carregarDashboard();