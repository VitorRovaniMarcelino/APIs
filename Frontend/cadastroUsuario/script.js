function cadastroUsuario(event) {
    event.preventDefault();

    let nome = event.target.nome.value;
    let idade = event.target.idade.value;
    let senha = event.target.senha.value;
    let cep = event.target.cep.value;
    let rua = event.target.rua.value;
    let bairro = event.target.bairro.value;
    let cidade = event.target.cidade.value;
    let uf = event.target.uf.value;
    let numero = event.target.numero.value;



    fetch('http://localhost:3000/usuarios', {

        method: 'POST',

        headers: {

            'Content-Type': 'application/json'

        },

        body: JSON.stringify({
            "nome": nome,
            "idade": idade,
            "senha": senha,
            "cep": cep,
            "rua": rua,
            "bairro": bairro,
            "cidade": cidade,
            "uf": uf,
            "numero": numero
        })

    })

        .then(response => response.json())

        .then(data => {
            console.log(data)
            alert("Usuário cadastrado com sucesso!");
            window.location.href = "../index.html";
        })


        .catch(error => console.log(error));

}