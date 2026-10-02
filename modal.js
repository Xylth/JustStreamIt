// ----- Fenêtre modale : détails d'un film -----

const modal = document.getElementById("modal");

// Formate les recettes : 48200000 -> "$48.2m"
function formatBoxOffice(amount) {
    if (amount === null || amount === undefined) {
        return "Non communiqué";
    }
    return "$" + (amount / 1_000_000).toFixed(1) + "m";
}

// Récupère les détails du film puis remplit et ouvre la modale
async function openModal(movieUrl) {
    const response = await fetch(movieUrl);
    const film = await response.json();

    document.getElementById("modal_title").textContent = film.title;
    document.getElementById("modal_year_genres").textContent = film.year + " - " + film.genres.join(", ");
    document.getElementById("modal_rating_duration").textContent =
        film.rated + " - " + film.duration + " minutes (" + film.countries.join(" / ") + ")";
    document.getElementById("modal_imdb").textContent = "IMDB score: " + film.imdb_score + "/10";
    document.getElementById("modal_box_office").textContent = "Recettes au box-office: " + formatBoxOffice(film.worldwide_gross_income);
    document.getElementById("modal_directors").textContent = film.directors.join(", ");
    document.getElementById("modal_poster").src = film.image_url;
    document.getElementById("modal_description").textContent = film.long_description;
    document.getElementById("modal_actors").textContent = film.actors.join(", ");

    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.classList.add("overflow-hidden"); // bloque le défilement de la page derrière
}

function closeModal() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.classList.remove("overflow-hidden");
}

// Fermeture : bouton "Fermer" (desktop) et croix (mobile / tablette)
document.querySelectorAll(".modal_close").forEach((button) => {
    button.addEventListener("click", closeModal);
});

// Fermeture en cliquant sur le fond gris autour de la modale
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Fermeture avec la touche Échap
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
});
