import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from 'date-fns'
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill
} from 'react-icons/bs';

import { FaCheckCircle, FaFilm, FaLanguage, FaGlobe, FaCalendarAlt} from "react-icons/fa";

import MovieCard from "../components/movieCard";

import "./Movie.css";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data);
  };

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });
  };

  useEffect(() => {
    const movieURL = `${moviesURL}${id}?${apiKey}`;
    getMovie(movieURL);
  }, [id]);

  return (
    <div className="movie-page">
      {movie && (
        <>
          <MovieCard movie={movie} showLink={false} />
          <p className="tagline"> {movie.tagline} </p>

          <div className="info">
            <h3><FaCheckCircle/> Status:</h3>
            <p>{movie.status}</p>
          </div>

          <div className="info">
          <h3> <FaCalendarAlt/>Data de Lançamento:</h3>
          <p>{format(new Date(movie.release_date), 'dd/MM/yyyy')}</p>
        </div>

          <div className="info">
          <h3><FaGlobe/> Países de Produção:</h3>
          <ul>
            {movie.production_countries.map((country) => (
              <li key={country.iso_3166_1}>
                {country.name}
              </li>
            ))}
          </ul>
        </div>

          <div className="info">
            <h3>
              <BsWallet2 /> Orçamento:
            </h3>
            <p> {formatCurrency(movie.budget)} </p>
          </div>
          <div className="info">
            <h3>
              <BsGraphUp /> Faturamento:
            </h3>
            <p> {formatCurrency(movie.revenue)} </p>
          </div>
          <div className="info">
            <h3>
              <BsHourglassSplit /> Duração:
            </h3>
            <p> {movie.runtime} minutes </p>
          </div>
          <div className="info">
            <h3><FaFilm/> Gêneros:</h3>
            <ul>
              {movie.genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>
          <div className="info">
            <h3><FaLanguage/> Idiomas:</h3>
            <ul>
              {movie.spoken_languages.map((language) => (
               <li key={language.iso_639_1}>
               {language.name} ({language.iso_639_1 === 'ja' ? 'Japanese' : language.english_name})
             </li>
              ))}
            </ul>
          </div>
          <div className="info-description">
            <h3>
              <BsFillFileEarmarkTextFill /> Sinopse:
            </h3>
            <p> {movie.overview} </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Movie;
