import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Howl's Moving Castle",
      poster: "../../img/howlsmovingcastle.jpeg",
      genre: "Adventure",
      director: "Hayao Miyazaki",
      release: "2004",
      summary: "When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent yet insecure young wizard and his companions in his legged, walking castle."
    },
    {
      id: 2,
      title: "Spirited Away",
      poster: "../../img/spiritedaway.jpeg",
      genre: "Adventure",
      director: "Hayao Miyazaki",
      release: "2001",
      summary: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches and spirits, a world where humans are changed into beasts."
    },
    {
      id: 3,
      title: "Princess Mononoke",
      poster: "../../img/princessmononoke.jpeg",
      genre: "Action",
      director: "Hayao Miyazaki",
      release: "1997",
      summary: "On a journey to find the cure for a Tatarigami's curse, Ashitaka finds himself in the middle of a war between the forest gods and Tatara, a mining colony. In this quest he also meets San, the Mononoke Hime."
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

if (movies.length === 0) {
  return <div>The list is empty!</div>
}

return (
  <div>
    {movies.map((movie) => {
      <MovieCard 
      key={movie.id}
      movie={movie}
      onMovieClick={(newSelectedMovie) => {
        setSelectedMovie(newSelectedMovie);
      }}
      />
    })}
  </div>
)
};