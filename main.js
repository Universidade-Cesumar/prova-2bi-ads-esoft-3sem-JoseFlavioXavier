const url = "https://6a29f8bcf59cb8f65f1de3eb.mockapi.io/api/v1/Materiai";

const btnCadastra = document.getElementById("btn-cadastrar");
const tabela = document.getElementById("corpo-tabela");

// Função para buscar e exibir os dados
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
                <td>${item.quantidade}</td>
            `;
            tabela.appendChild(novaLinha);
        });
    } catch (erro) {
        console.error("Erro na operação:", erro);
    }
}

// Função para enviar os dados
btnCadastra.addEventListener('click', async () => {
    const inputMaterial = document.getElementById("input-nome");
    const inputQuantidade = document.getElementById("input-quantidade");

    const material = inputMaterial.value;
    const quantidade = inputQuantidade.value;

    if (!quantidade || !material) {
        alert("Preencha todos os campos");
        return;
    }
//envia para o banco
    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ material: material, quantidade: quantidade })
    });

// 
    inputMaterial.value = "";
    inputQuantidade.value = "";

    
    carregarTabela();
});


carregarTabela();