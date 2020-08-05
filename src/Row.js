import React, {useEffect, useState} from 'react';
import instance from "./axios";
import './row.css'
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer"

const Row = ({title, fetchUrl, isLargeRow}) => {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const baseUrl = 'https://image.tmdb.org/t/p/original/'
    // console.log(movies)

    useEffect(() => {
        const fetchData = async () => {
            const request = await instance.get(fetchUrl);
            // console.log(request.status)
            if (request.status === 200) {
                setMovies(request.data.results);
                return request;
            }
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1
        }
    }

    const handleClick = (movie) => {
        // console.log(movie?.name)
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || movie?.title || "")
                .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                }).catch(err => {
                console.log(err)
            })
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {movies.map(movie => (
                    <img
                        key={movie.id}
                        className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
                        src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                        onClick={() => handleClick(movie)}
                    />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
        </div>
    );
};

export default Row;
