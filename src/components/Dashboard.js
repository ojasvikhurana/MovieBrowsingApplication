import React, { useEffect } from "react"
import { ListGroup, Carousel, Row, Container, Button, Col, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useHistory, Link } from 'react-router-dom';
import NavBar from "./Navbar";

export default function Dashboard() {
    const [error, setError] = React.useState(null);
    const { logout } = useAuth();
    const history = useHistory();
    const [movies, setMovies] = React.useState([]);
    const [items, setItems] = React.useState({});
    const listMovies = [
        {
            id: 0,
            title: "Trending",
            path: `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`,
        },
        {
            id: 1,
            title: "Netflix Originals",
            path: `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&with_networks=213`,
        },
        {
            id: 2,
            title: "Top Rated",
            path: `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`,
        },
        {
            id: 3,
            title: "Action",
            path: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&with_genres=28`,
        },
        {
            id: 4,
            title: "Comedy",
            path: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&with_genres=35`,
        },
        {
            id: 5,
            title: "Horror",
            path: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&with_genres=27`,
        },
        {
            id: 6,
            title: "Romance",
            path: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&with_genres=10749`,
        },
        {
            id: 7,
            title: "Documentaries",
            path: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&with_genres=99`,
        }
    ]

    

    useEffect(() => {
        async function func() {
            await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`)
                .then(res => res.json()).then(res => {
                    for (let i = 0; i < 10; i++) {
                        setMovies((movies) => [...movies, res.results[i].poster_path]);
                    }
                })
        }
        func();
    }, []);
    return (
        <div className="d-flex flex-column bg-dark  justify-content-start" style={{ minHeight: "100vh" }}>

            <NavBar />
            <br></br>
            <Carousel prevLabel="" nextLabel="" >
                {
                    movies.map((movie) => {
                        movie = "https://image.tmdb.org/t/p/w500" + movie;

                        return (
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={movie}
                                    alt="slide"
                                    style={{ height: "50vh" }} />
                            </Carousel.Item>
                        );
                    })}
            </Carousel>

            <div> {
                listMovies.map((movieGenre) => {

                    if (!items[movieGenre.id]) {
                        fetch(movieGenre.path)
                            .then(res => res.json()).then(res => {
                                setItems(prevItems => ({
                                    ...prevItems,
                                    [movieGenre.id]: res.results.slice(0, 10)
                                }));
                            })
                    }
                    return (<div>
                        <br></br>
                        <p style={{ color: "white" }}>{movieGenre.title}</p>
                        <Container fluid="true" className=" horizontal-scrollable w-100">
                            <Row className=" text-center  flex-row flex-nowrap overflow-auto w-100">
                                <Col>
                                    <ListGroup horizontal>{
                                        items[movieGenre.id] ?
                                            items[movieGenre.id].map((item) => {
                                                let path = "https://image.tmdb.org/t/p/w500" + item.poster_path;
                                                return (
                                                    <ListGroup.Item>
                                                        <img
                                                            className="d-block "
                                                            src={path}
                                                            alt="slide"
                                                            style={{ height: "50vh" }}
                                                        />
                                                    </ListGroup.Item>
                                                )
                                            }) : <div></div>
                                    } </ListGroup>
                                </Col>

                            </Row>
                        </Container>
                    </div>);

                })
            }</div>


        </div>
    )
}