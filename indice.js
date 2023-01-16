function atualizaPainel(){
    var vEstado = document.getElementById('uf').value;
    var Select = document.getElementById("Cartao").selectedIndex;
    var Option = document.getElementById("Cartao").options;
    var vOption = Option[Select].value;
    var url = (`http://192.168.10.66:8000/api/leads/bandeira=${vOption}/estado=${vEstado}`);
    alert(url)
fetch(url)
.then(function (res) {
    return res.json();
}).then(function (apiData) {
    console.log(apiData);
    renderizaDadosNaTabela(apiData);
})
}

function renderizaDadosNaTabela(todos) {
    const tabela = document.getElementById("tabela-leads");
    todos.forEach(todo => {
        let novaLinha = document.createElement("tr");
        Object.values(todo).forEach((value) => {
            let celula = document.createElement("td");
            celula.innerText = value;
            novaLinha.appendChild(celula);
        })
        tabela.appendChild(novaLinha);
    });
}

    //var ip = require("ip");
    //alert(`O Servidor tem o seguinte IP Público Local ${ip.address()}`);