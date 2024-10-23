import useSWR from 'swr';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { Card, CardImg } from 'react-bootstrap';



export default function MovieCardDetail({imdbID}) {
    const router = useRouter();
    const apiKey = '86da9b3a';

    const { data, error } = useSWR(
        `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`
    );

    if (error) {
        return <Error statusCode={404} />;
    }

    if (!data) {
        return null;
    }

    return (
        <Card>
            <CardImg 
                variant="top"
                src={data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'}
                alt={data.Title || 'N/A'}
                style={{ width: '300px', height: '500px', objectFit: 'cover' }} 
            />
            <Card.Body>
                <Card.Title>{data.Title || 'N/A'}</Card.Title>
                <Card.Text>
                    <strong>Year:</strong> {data.Year || 'N/A'}
                    <br />
                    <strong>Genre:</strong> {data.Genre || 'N/A'}
                    <br />
                    <strong>Plot:</strong> {data.Plot || 'N/A'}
                    <br />
                    <strong>Rating:</strong> {data.imdbRating || 'N/A'} ({data.imdbVotes || 'N/A'} votes)
                    <br /><br />
                    <strong>Director:</strong> {data.Director || 'N/A'}
                    <br />
                    <strong>Actors:</strong> {data.Actors || 'N/A'}
                    <br />
                    <strong>Language:</strong> {data.Language || 'N/A'}
                    <br />
                    <strong>Country:</strong> {data.Country || 'N/A'}
                    <br />
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
