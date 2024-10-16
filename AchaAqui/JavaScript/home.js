const url = "https://go-wash-api.onrender.com/api/auth/address"
const user = JSON.parse(localStorage.getItem('user'));
const token = user.access_token;

async function listarEnderecos() {
    
    let api = await fetch(url, {
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer' + token
        },
    });
    if(api.ok) {
        let enderecos = await api.json();
        alert('Meus endereços:')
        exibirEnderecos(enderecos);
    }else{
        alert('Deu ruim aqui!');
    }
    
}

function exibirEnderecos(enderecos){
    const listaEnderecos = document.getElementById('lista-enderecos');

    listaEnderecos.innerHTML = '';

    enderecos.forEach(endereco => {
        const listItem = document.createElement('li');
        listItem.textContent = `${endereco.titulo}, ${endereco.endereco}, ${endereco.numero} ${endereco.complemento} - ${endereco.cep}`;
        listaEnderecos.appendChild(listItem);
      });
    }
    
buscarEnderecos();
