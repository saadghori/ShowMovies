import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function MainNav() {
    const [searchField, setSearchField] = useState('');
    const router = useRouter();

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        router.push(`/movie?s=${searchField}`);
    };
  return (
    <>
        <Navbar expand="lg" className="fixed-top navbar-dark bg-dark">
        <Container>
            <Navbar.Brand href="/">ShowMovies</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Form className="d-flex" onSubmit={handleSearchSubmit}>
                <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value = {searchField}
                onChange={(e) => setSearchField(e.target.value)}
                />
                <Button type="submit" variant="success">Search</Button>
            </Form>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        <br />
        <br />
    </>
  );
}
