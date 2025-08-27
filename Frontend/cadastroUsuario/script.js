
function cadastroUsuario(event) {
    event.preventDefault();

    // console.log(event);
    // console.log(event.target);
    // console.log(event.target.nome);
    // console.log(event.target.nome.value);

    let nome = event.target.nome.value;
    let idade = event.target.idade.value;
    let senha = event.target.senha.value;

    fetch('http://localhost:3000/usuarios', {

        method: 'POST',

        headers: {

            'Content-Type': 'application/json'

        },

        body: JSON.stringify({
            "Nome": nome,
            "Idade": idade,
            "Senha": senha
        })

    })

        .then(response => response.json())

        .then(data => console.log(data))

        .catch(error => console.log(error));

}