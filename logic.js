//intialisation de la page d'accueil
async function init(){
    // Récupération des éléments du DOM
    const best_movie_poster = document.getElementById("best_movie_poster");
    const best_movie_title = document.getElementById("best_movie_title");
    const best_movie_short_description = document.getElementById("best_movie_short_description");
    const best_movie_button = document.getElementById("best_movie_button");
    const top_movies_container = document.getElementById("top_movies").querySelector(".section_content");
    const action_movies_container = document.getElementById("action_movies").querySelector(".section_content");
    const comedy_movies_container = document.getElementById("comedy_movies").querySelector(".section_content");
    const other_movies_selector = document.querySelectorAll(".genre_select");
    
    // Récupération des genres et remplissage des sélecteurs
    let genres = await getGenres();
    other_movies_selector.forEach(select => {
        genres.forEach(genre => {
            let option1 = document.createElement("option");
            option1.value = genre; 
            option1.textContent = genre;
            select.appendChild(option1);
        });
    });
    
    // Récupération des meilleurs films et affichage du meilleur film
    let highscores = await getBetterMovies("");
    const best = highscores[0];
    best_movie_poster.src = best.image_url;
    best_movie_title.innerHTML = best.title;
    let short = await getMovieShort(best);
    best_movie_short_description.innerHTML = short.description;
    // Bouton "Détails" du meilleur film : l'URL du film est rangée dans data-url
    best_movie_button.addEventListener("click", () => {
        openModal(best.url);
    });

    // Création des vignettes pour les 6 meilleurs films
    for (let i = 1; i <7 ; i++){
        createVignette(highscores[i], top_movies_container);
    }

    // Création des vignettes pour les 6 meilleurs films d'action
    let action_movies = await getBetterMovies("Action");
    let i = 0;
    for (const movie of action_movies) {
        createVignette(movie, action_movies_container);
        i++;
        if (i >= 6) break;
    }
    
    // Création des vignettes pour les 6 meilleurs films de comédie
    let comedy_movies = await getBetterMovies("Comedy");
    i = 0;
    for (const movie of comedy_movies) {
        createVignette(movie, comedy_movies_container);
        i++;
        if (i >= 6) break;
    }

    // Création des vignettes suite à un evenement de changement de genre dans les sélecteurs
    other_movies_selector.forEach((select) => {
        select.addEventListener("change", async () => {
            const container = select.closest(".section").querySelector(".section_content");
            clearContainer(container);
            const genre = select.value;
            if (genre !== "") {
                const movies = await getBetterMovies(genre);
                let i = 0;
                for (const movie of movies) {
                createVignette(movie, container);
                i++;
            if (i >= 6) break;
            }
        }
        });
    });
}

// Création d'une vignette de film et ajout dans le conteneur
async function createVignette(movie, container){
    const template = document.getElementById("vignette_template");
    const clone = template.content.cloneNode(true);
    clone.querySelector(".vignette_poster").src = movie.image_url;
    clone.querySelector(".vignette_poster").alt = "Affiche du film " + movie.title;
    clone.querySelector(".vignette_title").textContent = movie.title;
    clone.querySelector(".vignette_button").addEventListener("click", () => {
        openModal(movie.url);
    });
    container.appendChild(clone);   
}

// Supprime toutes les vignettes d'un conteneur
function clearContainer(container){
    let vignettes = container.querySelectorAll(".vignette");
    vignettes.forEach(vignette => vignette.remove());
}

init()

