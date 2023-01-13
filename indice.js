function atualizaPainel(){
    var vEstado = document.getElementById('uf').value;
    var vCartao = document.getElementById("Cartao").value;
    var url = (`http://192.168.10.48:8000/api/leads/bandeira=${vCartao}/estado=${vEstado}`);
    // alert(url);
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
