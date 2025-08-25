fetch("http://localhost:3000/usuario").then(async res=>{
    if(!res.ok){
        throw new Error("Erro ao buscar usuários");
    }

    return res.json();
}).then(usuarios=>{
    const listaUsuarios = document.getElementById("lista-usuarios");
    usuarios.forEach(usuario => {
        console.log(usuario.Nome);
        listaUsuarios.innerHTML += `<li class="list-group-item">${usuario.Nome}</li>`;
    });

})
.catch(err=>{
    console.error(err);
});   
