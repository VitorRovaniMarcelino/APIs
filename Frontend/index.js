fetch("http://localhost:3000/usuario").then(async res => {
    if (!res.ok) {
        throw new Error("Erro ao buscar usuários");
    }

    return res.json();
}).then(usuarios => {
    const listaUsuarios = document.getElementById("lista-usuarios");
    usuarios.forEach(usuario => {
        console.log(usuario.bairro);
        listaUsuarios.innerHTML += `
        <li class="list-group-item">
        <div class="d-flex justify-content-between">
            <h5>Nome: ${usuario.nome} - Idade: ${usuario.idade} - Cidade: ${usuario.cidade} - Estado: ${usuario.uf}</h5>

            <div>
                <a href="editarUsuario/index.html?id=${usuario.id}" class="btn btn-info">Atualizar</a>
                <button type="button" class="btn btn-danger" onclick="deletarUsuario(${usuario.id})">Deletar</button>
            </div>
        </div>

        </li>
        `;
    });

})
    .catch(err => {
        console.error(err);
    });   

function deletarUsuario(userId){
    let confirmar = confirm("Você realmente deseja excluir o usuário: " + userId + "?");
    console.log(confirmar);
    if (confirmar) {
        fetch(`http://localhost:3000/usuarios/${userId}`, {
        
            method: 'DELETE',

        })
            .then(response => {    
                if (response.ok = true){
                    alert(`Usuário ${userId} deletado com sucesso!`)
                    window.location.reload()
                    return;     
                }
                alert("Algo deu errado!");
            })
            
            .catch(error => console.log(error));
    }
}