export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.image} width="20%"/>
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Released: </span>
        <span>{movie.year}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      <div>
        <span>Summary: </span>
        <span>{movie.summary}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};