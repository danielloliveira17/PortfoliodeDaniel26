window.addEventListener("load", function () {

    document.body.classList.add("page-loaded");

});


document.querySelectorAll(".page-link").forEach(function (link) {

    link.addEventListener("click", function (event) {

        const destino = this.getAttribute("href");

        if (
            !destino ||
            destino.charAt(0) === "#" ||
            destino.indexOf("https://") === 0 ||
            destino.indexOf("http://") === 0 ||
            this.target === "_blank"
        ) {
            return;
        }

        event.preventDefault();

        document.body.classList.add("page-exit");

        setTimeout(function () {

            window.location.href = destino;

        }, 740);

    });

});