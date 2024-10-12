const url = "https://go-wash-api.onrender.com/api/auth/address"

async function cadastrar() {
    var titulo = document.getElementById('titulo').value;
    var cep = document.getElementById('cep').value;
    var endereço = document.getElementById('endereço').value;
    var numero = document.getElementById('numero').value;
    var complemento = document.getElementById('complemento').value;


    const validarEndereço = (titulo != '' && cep != '' && endereço != '' &&
        numero != '' && complemento != '');

    if (validarEndereço) {
        /*let api = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "title": titulo,
                "cep": cep,
                "address": endereço,
                "number": numero,
                "complement": complemento

            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });*/
        alert('Endereço cadastrado com sucesso')




    } else {
        alert('Preencha todos os campos!')
    }
}

