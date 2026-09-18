function logar() {

    const login = document.getElementById("login").value;
    const senha = document.getElementById("senha").value;

    if (!window.supabaseClient) {

        alert("Configuração do Supabase ausente.");

        return;
    }

    window.supabaseClient.auth.signInWithPassword({

        email: login,
        password: senha

    })
    .then(({ error }) => {

        if (error) {

            console.error("Erro:", error.message);

            alert(mensagemErroLogin(error));

            return;
        }

        alert("Login realizado com sucesso!");

        window.location.href = "home.html";
    })
    .catch(error => {

        console.error("Erro:", error);

        alert("Não foi possível conectar ao servidor.");
    });
}


function mensagemErroLogin(error) {

    if (error.code === "invalid_credentials") {

        return "E-mail ou senha inválidos!";
    }

    return "Não foi possível entrar. Tente novamente.";
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