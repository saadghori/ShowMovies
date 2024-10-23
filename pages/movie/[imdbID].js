import { useRouter } from 'next/router';
import { Row, Col } from 'react-bootstrap';
import MovieCardDetail from '@/src/components/MovieCardDetail';

export default function MovieById() {
    const router = useRouter();
    const { imdbID } = router.query; // Retrieve the imdbID from the route parameters

    // Check if imdbID is defined before rendering MovieCardDetail
    if (!imdbID) {
        return <div>Loading...</div>; // Render a loading state while waiting for imdbID
    }

    return (
        <Row>
            <Col>
                <MovieCardDetail imdbID={imdbID} />
            </Col>
        </Row>
    );
}
