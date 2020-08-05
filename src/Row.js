import React, {useEffect, useState} from 'react';
import instance from "./axios";
import './row.css'

const Row = ({title, fetchUrl, isLargeRow}) => {

    const [movies, setMovies] = useState([]);
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
                    />
                ))}
            </div>

        </div>
    );
};

export default Row;