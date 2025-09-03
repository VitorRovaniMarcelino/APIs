function pesquisacep(valor) {
    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('rua').value = "...";
            document.getElementById('bairro').value = "...";
            document.getElementById('cidade').value = "...";
            document.getElementById('uf').value = "...";

            // 🔹 Faz a requisição à API ViaCEP
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(conteudo => {
                    if (!("erro" in conteudo)) {
                        document.getElementById('rua').value = conteudo.logradouro;
                        document.getElementById('bairro').value = conteudo.bairro;
                        document.getElementById('cidade').value = conteudo.localidade;
                        document.getElementById('uf').value = conteudo.uf;

                        
                    } else {
                        limpa_formulário_cep();
                        alert("CEP não encontrado.");
                    }
                })
                .catch(() => {
                    limpa_formulário_cep();
                    alert("Erro ao consultar o CEP.");
                });

        } else {
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } else {
        limpa_formulário_cep();
    }
};
