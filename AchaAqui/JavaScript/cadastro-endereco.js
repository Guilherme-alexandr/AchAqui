const url = "https://go-wash-api.onrender.com/api/auth/address"

window.onload = function() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user || !user.access_token) {
        alert('Usuario não autorizado. Você será redirecionado para o login.');
        setTimeout(() => {
            window.location.href = '/view/login.html';
        }, 500);
    } else {
        const token = user.access_token;
        console.log("Token:", token);
    }
}

async function Cadastrar() {
    var titulo = document.getElementById('titulo').value;
    var cep = document.getElementById('cep').value;
    var endereco = document.getElementById('endereco').value;
    var numero = document.getElementById('numero').value;
    var complemento = document.getElementById('complemento').value;


    const validarEndereco = (titulo != '' && cep != '' && endereco != '' &&
        numero != '');

    if (validarEndereco) {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.access_token;

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
            location.href = "http://127.0.0.1:5500/view/home.html"
            return;
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

function logout() {
    localStorage.removeItem('user');
    window.location.href = "/view/index.html";
}