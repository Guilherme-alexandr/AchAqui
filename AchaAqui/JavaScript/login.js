const url = 'https://go-wash-api.onrender.com/api/login'



async function login() {
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    const validarLogin = (email != '' && senha != '')


    if (validarLogin) {
        let api = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "email": email,
                "password": senha,
                "user_type_id": 1

            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (api.ok) {
            let resposta = await api.json();
            localStorage.setItem('user', JSON.stringify(resposta))
            console.log(resposta)
            alert('redirecionando...')
            location.href = "http://127.0.0.1:5500/view/home.html"
            return
        }
        let respostaErro = await api.json();
        if (respostaErro.data.errors) {
            alert(respostaErro.data.errors)
            return false
        } else if (respostaErro.data) {
            alert(respostaErro.data.errors)
            return false
        } else if (validarLogin == false) {
            alert('Preencha todos os campos!');
        }
    }

function esqueceu() {
    var email = prompt('Digite o seu endereço de email: ')

    if (email != "") {
        alert(`Foi enviado uma mensagem para modificar sua senha, verifique seu email!`);
    } else {
        alert('Endereço de email invalido !');
    }
}