function logar() {

    const login = document.getElementById("login").value;
    const senha = document.getElementById("senha").value;

    fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: login,
            senha: senha
        })
    })

    .then(response => response.json())

    .then(data => {

        if (data.success) {

            alert(data.message);

            window.location.href = "home.html";

        } else {

            alert(data.message);
        }
    })

    .catch(error => {

        console.error("Erro:", error);

        alert("Não foi possível conectar ao servidor.");
    });
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