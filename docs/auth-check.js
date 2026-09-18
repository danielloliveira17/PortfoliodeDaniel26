document.addEventListener("DOMContentLoaded", () => {

    protegerPagina();

});

async function protegerPagina() {

    if (!window.supabaseClient) {

        window.location.href = "index.html";

        return;
    }

    const { data: { user }, error } = await window.supabaseClient.auth.getUser();

    if (error || !user) {

        window.location.href = "index.html";

    }
}