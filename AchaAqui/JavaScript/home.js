const url = "https://go-wash-api.onrender.com/api/auth/address"
const user = JSON.parse(localStorage.getItem('user'));
const token = user.access_token;

async function listarEnderecos() {
    try {
        let api = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer' + token
            },
        });
        if (api.ok) {
            let resposta = await api.json();
            console.log(resposta);

            const enderecos = resposta.data;

            if (Array.isArray(enderecos)) {
                exibirEnderecos(enderecos);
            } else {
                exibirEnderecos([enderecos]);
            }
        } else {
            alert('Erro ao buscar endereços:', error);
        }

    } catch (error) {
        console.log('Erro ao buscar endereços:', error);
        alert('Erro ao buscar endereços. Tente novamente mais tarde.');
    }
}

function exibirEnderecos(enderecos) {
    const lista = document.getElementById('lista-enderecos');
    lista.innerHTML = '';

    enderecos.forEach(endereco => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${endereco.title}: ${endereco.formatted_address} (CEP: ${endereco.cep})<br><br>
            <button class="Add" onclick="mostrarFormularioAtualizacao('${endereco.id}', '${endereco.title}', '${endereco.formatted_address}', '${endereco.cep}')">Atualizar</button>
            <button class="Add" onclick="deletarEndereco('${endereco.id}', '${endereco.title}')">Deletar</button><br><br>
        `;
        lista.appendChild(li);
    });
}

function mostrarFormularioAtualizacao(id, title, cep, endereco, numero, complemento) {
    const form = `
           <h3>Atualizar Endereço</h3>
        <input type="text" id="title-${id}" value="${title}" placeholder="Título">
        <input type="text" id="cep-${id}" value="${cep}" placeholder="CEP">
        <input type="text" id="endereco-${id}" value="${endereco}" placeholder="Endereço">
        <input type="text" id="numero-${id}" value="${numero}" placeholder="Número">
        <input type="text" id="complemento-${id}" value="${complemento}" placeholder="Complemento">
        <button onclick="atualizarEndereco('${id}')">Salvar</button>
        <button onclick="fecharFormulario()">Cancelar</button>
        `;
    const divFormulario = document.getElementById('formulario-atualizacao');
    divFormulario.innerHTML = form;
    divFormulario.style.display = 'block';
}

function fecharFormulario() {
    const divFormulario = document.getElementById('formulario-atualizacao');
    divFormulario.innerHTML = '';
    divFormulario.style.display = 'none';
}

async function atualizarEndereco(id) {
    const title = document.getElementById(`title-${id}`).value;
    const cep = document.getElementById(`cep-${id}`).value;
    const endereco = document.getElementById(`endereco-${id}`).value;
    const numero = document.getElementById(`numero-${id}`).value;
    const complemento = document.getElementById(`complemento-${id}`).value;

    const data = {
        id: id,
        title: title,
        cep: cep,
        address: endereco,
        number: numero,
        complemento: complemento

    };
    try {
        let api = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        });
        if (api.ok) {
            alert('Endereço atualizado com sucesso!');
            fecharFormulario();
            listarEnderecos();
        } else {
            alert('Erro ao atualizar o endereço. Status: ' + api.status);
        }
    } catch (error) {
        console.log('Erro ao atualizar endereço', error);
        alert('Erro ao atualizar o endereço. Tente novamente mais tarde.');
    }

}

async function deletarEndereco(id, title) {
    const confirmacao = confirm(`Você tem certeza que deseja deletar o endereço "${title}"?`);

    if (!confirmacao) return;

    try {
        let api = await fetch(`${url}/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        if (api.ok) {
            alert('Endereço deletado com sucesso!');
            listarEnderecos();
        } else {
            alert('Erro ao deletar o endereço.' + api.status);
        }
    } catch (error) {
        console.log('Erro ao deletar endereço:', error);
        alert('Erro ao deletar o endereço. Tente novamente mais tarde.');
    }

}

function logout() {
    localStorage.removeItem('user');
    window.location.href = "/view/index.html";
}