import { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Search from '@/src/components/Search'

export default function Home() {
  return (
    <Container className="text-center mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 border-0">
            <h1>Search for Your Favorite Movies!</h1>
          </Card>
        </Col>
      </Row>
      <Search/>
    </Container>
  );
}
