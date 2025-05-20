const url = 'https://go-wash-api.onrender.com/api/user'

    
async function cadastrar(){
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var cpf = document.getElementById('cpf').value;
    var date = document.getElementById('date').value;
    var senha = document.getElementById('senha').value;
    var confirme = document.getElementById('confirme').value;
    var termos = document.getElementById('termos').checked;
    const validarCadastro = (nome != '' && email != '' && cpf != ''
         && date != '' && senha != '' && confirme != '');

    
     if(validarCadastro && senha == confirme && termos == true){
        let api = await fetch(url, {
            method:"POST",
            body:JSON.stringify({
                "name":nome,
                "email":email,
                "user_type_id":1,
                "password": senha,
                "cpf_cnpj": cpf,
                "terms": termos,
                "birthday":date
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        
        if(api.ok){
            let resposta = await api.json();
            console.log(resposta)
            alert(`Enviamos um link de ativação de conta no email: ${email}, clique e ative sua conta. `);
            location.href = "http://127.0.0.1:5500/view/login.html"
            return;
        }
        let respostaErro = await api.json();
        if(respostaErro.data.errors.cpf_cnpj){
            alert(respostaErro.data.errors.cpf_cnpj[0])
            return false
        }else if (respostaErro.data.errors.email){
            alert(respostaErro.data.errors.email[0])
            return false
        }else if (respostaErro.data.errors.password){
            alert(respostaErro.data.errors.password[0])
            return false
        }
       
        
    }else if(validarCadastro == false){
        alert('Preencha todos os campos!')
        return false
    }else if(senha != confirme){
        alert('Senhas diferentes, digite novamente!');
        return false
    }else if(termos == false){
        alert('Para validar o cadastro precisa aceitar os termos!');
        return false
    }

}