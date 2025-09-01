fetch("http://localhost:3000/usuario").then(async res => {
    if (!res.ok) {
        throw new Error("Erro ao buscar usuários");
    }

    return res.json();
}).then(usuarios => {
    const listaUsuarios = document.getElementById("lista-usuarios");
    usuarios.forEach(usuario => {
        console.log(usuario.nome);
        listaUsuarios.innerHTML += `
        <li class="list-group-item">
        <div class="d-flex justify-content-between">
            <h5>Nome: ${usuario.nome} - Idade: ${usuario.idade}</h5>
            <a href="editarUsuario/index.html?id=${usuario.id}" class="btn btn-info">Atualizar</a>
        </div>
        </li>
        `;
    });

})
    .catch(err => {
        console.error(err);
    });   
