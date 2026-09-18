function cadastrar() {

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    if (senha !== confirmarSenha) {

        alert("As senhas não são iguais!");

        return;
    }

    if (!window.supabaseClient) {

        alert("Configuração do Supabase ausente.");

        return;
    }

    window.supabaseClient.auth.signUp({

        email: email,
        password: senha,

        options: {
            data: {
                nome: nome
            }
        }
    })
    .then(({ data, error }) => {

        if (error) {

            console.error("Erro:", error.message);

            alert(mensagemErroCadastro(error));

            return;
        }

        if (data.session) {

            alert("Cadastro realizado com sucesso!");

            window.location.href = "home.html";

        } else {

            alert("Cadastro realizado! Confirme seu e-mail para ativar a conta.");

            window.location.href = "index.html";
        }
    })
    .catch(error => {

        console.error("Erro:", error);

        alert("Não foi possível conectar ao servidor.");
    });
}


function mensagemErroCadastro(error) {

    if (error.code === "user_already_exists") {

        return "Este e-mail já está cadastrado!";
    }

    return "Não foi possível realizar o cadastro. Tente novamente.";
}


function voltarLogin() {

    window.location.href = "index.html";

}


function mostrarSenha(id, elemento) {

    const campo = document.getElementById(id);

    if (campo.type === "password") {

        campo.type = "text";

        elemento.textContent = "🏎️";

    } else {

        campo.type = "password";

        elemento.textContent = "👁";

    }
}