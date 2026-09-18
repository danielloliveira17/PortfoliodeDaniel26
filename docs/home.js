document.addEventListener("DOMContentLoaded", () => {

    carregarHome();

    const botaoSair = document.getElementById("sair");

    if (botaoSair) {

        botaoSair.addEventListener("click", (event) => {

            event.preventDefault();

            deslogar();

        });

    }

});

async function carregarHome() {

    if (!window.supabaseClient) {

        window.location.href = "index.html";

        return;
    }

    const { data: { user }, error } = await window.supabaseClient.auth.getUser();

    if (error || !user) {

        window.location.href = "index.html";

        return;
    }

    const { data: perfil } = await window.supabaseClient
        .from("profiles")
        .select("nome")
        .eq("id", user.id)
        .single();

    let nome = null;

    if (perfil && perfil.nome) {

        nome = perfil.nome;

    } else if (user.user_metadata && user.user_metadata.nome) {

        nome = user.user_metadata.nome;

    } else {

        nome = user.email;

    }

    const saudacao = document.getElementById("saudacao");

    if (saudacao) {

        saudacao.textContent = "Olá, " + nome + "!";

    }
}

async function deslogar() {

    await window.supabaseClient.auth.signOut();

    window.location.href = "index.html";
}