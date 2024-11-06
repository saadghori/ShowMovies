import { Form, Row, Col, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

export default function AdvancedSearch(){
    const router = useRouter();
    const { register, handleSubmit, formState : {errors}} = useForm();

    const submitForm = (data) => {
        let queryString = `s=${encodeURIComponent(data.title)}`;
        
        // Add optional filters if they are provided
        if (data.type) {
            queryString += `&type=${encodeURIComponent(data.type)}`;
        }
        if (data.year) {
            queryString += `&y=${encodeURIComponent(data.year)}`;
        }
        
        router.push(`/movie?${queryString}`);

    };

    return (
        <>
        <Form onSubmit={handleSubmit(submitForm)}>
            <Row>
                <Col>
                    <Form.Group className='mb-3'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter title"
                            {...register('title', {required: true})}
                            className={errors.title ? 'is-invalid' : ''}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Type</Form.Label>
                        <Form.Select {...register('type')}>
                            <option value="">Any</option>
                            <option value="movie">Movie</option>
                            <option value="series">Series</option>
                            <option value="episode">Episode</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Year of Release</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Enter year" 
                            {...register('year')}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="primary" type="submit">
                        Search
                    </Button>
                </Col>
            </Row>
        </Form>
        </>

    );
}