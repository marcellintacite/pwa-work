import { openDB } from "idb";

const db = await openDB("films-data", 1, {
  upgrade(db) {
    db.createObjectStore("films");
  },
});

const Headers = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjJkZjBmNzY3YmZhZTNkZjBiZDc3ZGU0NjRiNDRmMSIsInN1YiI6IjYzZDg4MzUyMTJiMTBlMDA3ZmRjNDE5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Jh23bxVHml7eVhwpZZGDxJRYec7B0QYpY6MIipm0cdc",
  },
};

const url = "https://api.themoviedb.org/3/movie/popular?language=fr-FR";

fetch(url, Headers)
  .then((res) => res.json())
  .then((json) => {
    db.add("films", json.results, "films");
    renderFilms(json.results, "online");
  });
const renderFilms = (data, type) => {
  const showdata = type === "online" ? data : data[0];

  showdata.forEach((film) => {
    const filmContainer = document.querySelector(".movies-container");
    const imglink = `https://image.tmdb.org/t/p/original` + film.poster_path;
    filmContainer.innerHTML += `
    <div class="movie hide">
          <img src=${imglink} loading="lazy" />

          <h3>${film.title}</h3>
          <p>
            ${film.overview}
          </p>
          <div class="info">
            <span class="year">${film.release_date}</span>
            <span class="rating">Popularty : ${film.popularity}</span>
          </div>
        </div>
`;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(entry.target);
          entry.target.classList.add("show");
        } else {
          console.log("not visible");
          entry.target.classList.remove("hide");
        }
      });
    });

    const items = document.querySelectorAll(".movie");
    items.forEach((item) => {
      observer.observe(item);
    });
  });
};

const renderOffline = async () => {
  const movies = await db.getAll("films");
  renderFilms(movies, "offline");
};

renderOffline();
