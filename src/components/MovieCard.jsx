import useSWR from 'swr';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import Error from 'next/error';

export default function MovieCard({imdbID}) {
    const apiKey = '86da9b3a';
    const {data, error} = useSWR(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`);

    if(error){
        return <Error statusCode={404} />
    }

    if(!data){
        return null;
    }

    return (
        <Card>
            <Card.Img 
                variant="top" 
                src={data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'}
                alt={data.Title || 'N/A'}
            />
            <Card.Body>
                <Card.Title>{data.Title || 'N/A'}</Card.Title>
                <Card.Text>
                    <strong>Year:</strong> {data.Year || 'N/A'}
                    <br />
                    <strong>Genre:</strong> {data.Genre || 'N/A'}
                    <br />
                    <strong>Rating:</strong> {data.imdbRating || 'N/A'}
                </Card.Text>
                <Link href={`/movie/${data.imdbID}`} passHref>
                    <Button variant="primary">View More</Button>
                </Link>
            </Card.Body>
        </Card>
    )
}