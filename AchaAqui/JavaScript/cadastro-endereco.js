const url = "https://go-wash-api.onrender.com/api/auth/address"

async function Cadastrar() {
    alert('carregando..')
    var titulo = document.getElementById('titulo').value;
    var cep = document.getElementById('cep').value;
    var endereco = document.getElementById('endereco').value;
    var numero = document.getElementById('numero').value;
    var complemento = document.getElementById('complemento').value;


    const validarEndereco = (titulo != '' && cep != '' && endereco != '' &&
        numero != '');

    if (validarEndereco) {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user ? `Bearer ${user.token}` : '';

        let api = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "title": titulo,
                "cep": cep,
                "address": endereco,
                "number": numero,
                "complement": complemento

            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer' + token

            },

        });
        if (api.ok) {
            let resposta = await api.json();
            console.log(resposta.data)
            alert(`Endereço ${resposta.data.title} cadastrado com sucesso!`)
        }
        let respostaErro = await api.json();
        if(respostaErro.status){
            console.log(resposta.status)
            alert(respostaErro.status)    
        }


    } else {
        alert('Preencha todos os campos!')
    }
}

