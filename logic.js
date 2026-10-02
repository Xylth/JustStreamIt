async function init(){
    const best_movie_poster = document.getElementById("best_movie_poster");
    const best_movie_title = document.getElementById("best_movie_title");
    const best_movie_short_description = document.getElementById("best_movie_short_description");
    const best_movie_button = document.getElementById("best_movie_button");
    const top_movies_container = document.getElementById("top_movies").querySelector(".section_content");
    const action_movies_container = document.getElementById("action_movies").querySelector(".section_content");
    const comedy_movies_container = document.getElementById("comedy_movies").querySelector(".section_content");
    const other_movies1_container = document.getElementById("other_movies1").querySelector(".section_content");
    const other_movies2_container = document.getElementById("other_movies2").querySelector(".section_content");
    const other_movies1_select = document.getElementById("other_movies1_select");
    const other_movies2_select = document.getElementById("other_movies2_select");
    let genres = await getGenres();
    genres.forEach(genre => {
        let option1 = document.createElement("option");
        option1.value = genre;
        option1.textContent = genre;
        other_movies1_select.appendChild(option1);
        let option2 = document.createElement("option");
        option2.value = genre;
        option2.textContent = genre;
        other_movies2_select.appendChild(option2);
    });
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
    for (let i = 1; i <7 ; i++){
        createVignette(highscores[i], top_movies_container);
    }
    let action_movies = await getBetterMovies("Action");
    let i = 0;
    for (const movie of action_movies) {
        createVignette(movie, action_movies_container);
        i++;
        if (i >= 6) break;
    }
    let comedy_movies = await getBetterMovies("Comedy");
    i = 0;
    for (const movie of comedy_movies) {
        createVignette(movie, comedy_movies_container);
        i++;
        if (i >= 6) break;
    }

    other_movies1_select.addEventListener("change", async () => {
        clearContainer(other_movies1_container);
        const genre = other_movies1_select.value;
        const movies = await getBetterMovies(genre);
        let i = 0;
        for (const movie of movies) {
            createVignette(movie, other_movies1_container);
            i++;
            if (i >= 6) break;
        }
    });

    other_movies2_select.addEventListener("change", async () => {
        clearContainer(other_movies2_container);
        const genre = other_movies2_select.value;
        const movies = await getBetterMovies(genre);
        let i = 0;
        for (const movie of movies) {
            createVignette(movie, other_movies2_container);
            i++;
            if (i >= 6) break;
        }
    });

    other_movies1_select.dispatchEvent(new Event("change"));
    other_movies2_select.dispatchEvent(new Event("change"));
}

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

function clearContainer(container){
    let vignettes = container.querySelectorAll(".vignette");
    vignettes.forEach(vignette => vignette.remove());
}

init()

