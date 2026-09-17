function cadastrar() {

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    if (senha !== confirmarSenha) {
        alert("As senhas não são iguais!");
        return;
    }

    fetch("http://localhost:3000/api/cadastro", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            nome: nome,
            email: email,
            senha: senha
        })
    })

    .then(response => response.json())

    .then(data => {

        if (data.success) {

            alert(data.message);

            // Volta para o login
            window.location.href = "login.html";

        } else {

            alert(data.message);
        }

    })

    .catch(error => {

        console.error("Erro:", error);

        alert("Não foi possível conectar ao servidor.");
    });
}


function voltarLogin() {

    window.location.href = "login.html";

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