async function getBetterMovies(genre){
    let data=[];
    let response = await fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre="+ genre );
    let raw = await response.json();
    raw.results.forEach(film =>{
        data.push({url:film.url,title:film.title,image_url:film.image_url});
    } );
    if (raw.count > 6) {
        response = await fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page=2&genre=" + genre);
        raw = await response.json();
        raw.results.forEach(film =>{
        data.push({url:film.url,title:film.title,image_url:film.image_url});
        } );
    }
    return data;
};

async function getGenres(){
    let data=[];
    let response = await fetch("http://localhost:8000/api/v1/genres/");
    let raw = await response.json();
    do{
        raw.results.forEach(genre => {
            data.push(genre.name);
        });
        response = await fetch(raw.next);
        raw = await response.json();
    }while (raw.next !== null) ;
    return data;
}

async function getMovieShort(film){
    let response = await fetch(film.url)
    let raw = await response.json()
    return {description: raw.description}
}