import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Error from 'next/error';
import { Row, Col, Pagination, Card } from 'react-bootstrap';
import MovieCard from '@/src/components/MovieCard';

const PER_PAGE = 12;

export default function Movie() {
  const [movieList, setMovieList] = useState([]); // Initialize as an empty array
  const [page, setPage] = useState(1);
  const router = useRouter();
  const finalQuery = router.asPath.split('?')[1];
  const apiKey = '86da9b3a';

  const { data, error } = useSWR(`https://www.omdbapi.com/?apikey=${apiKey}&${finalQuery}`);

  useEffect(() => {
    if (data && data.Search) {
      const results = [];
      for (let i = 0; i < data.Search.length; i += PER_PAGE) {
        const chunk = data.Search.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setMovieList(results);
      setPage(1); // Reset page to 1 whenever new data is fetched
    } else {
      setMovieList([]); // Reset to empty if no data
    }
  }, [data]);

  const previousPage = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  const nextPage = () => {
    if (page < movieList.length) setPage(prev => prev + 1);
  };

  if (error) return <Error statusCode={404} />;

  return (
    <>
      {movieList.length > 0 ? (
        <>
          <Row className="gy-4">
            {movieList[page - 1].map(movie => (
              <Col lg={3} key={movie.imdbID}>
                <MovieCard imdbID={movie.imdbID} />
              </Col>
            ))}
          </Row>
          
          <Row>
            <Col>
              <Pagination>
                <Pagination.Prev onClick={previousPage} disabled={page === 1} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={nextPage} disabled={page >= movieList.length} />
              </Pagination>
            </Col>
          </Row>
        </>
      ) : (
        <Card>
          <Card.Body>
            <h4>Nothing Here</h4>
            <p>Try searching for something else.</p>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
