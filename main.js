// Arquivo para código javascript

//lista vazia para receber os materias
let listaDemateriais =[];


// criando o botão adicionar
const btnCadastrar = document.getElementById("btn-cadastrar");
const tabela = document.getElementById("corpo-tabela");


btnCadastrar.addEventListener(onclick, () =>{
    const inputMaterial = document.getElementById("input-nome");
    const inputQtd = document.getElementById("input-quantidade");

    const material = inputMaterial.value;
    const quantidade = inputQtd.value;

    if(material === "" || quantidade ===""){
        alert("Favor informar o material e a sua quantidade")
        return;
    }

    addListaDeMaterias(material, quantidade);
    inputMaterial.value = "";
    inputQtd.value = "";
})

