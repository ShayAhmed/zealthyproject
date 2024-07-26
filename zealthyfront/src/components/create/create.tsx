import React from 'react';
import { useState } from 'react';
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import { postNewTicket } from '../../utils/request';
//import { postNewTicket } from '../utils/request';

const Create = () => {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [usernameError, setUsernameError] = useState<string | null>(null)
    const [emailError, setEmailError] = useState<string | null>(null)
    const [desciptionError, setDesciptionError] = useState<string | null>(null)
    const [countClick, setCountClick] = useState(0);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (handleError() === true) {
            return;
        }

        e.target.reset();

        try {
            console.log(username);
            await postNewTicket(username, email, description)
                .then((res) => {
                    if (res === undefined) {
                        console.log('res was undefined')
                    }
                    console.log(res)
                })
            //setSnackMessage('Ticket submitted successfully.');
            setUsername('');
            setEmail('');
            setDescription('');
        } catch (error) {
            console.error('Error submitting ticket:', error);
            //setSnackMessage('Error submitting ticket.');
        }
        //setOpenSnack(true);
    };

    const handleError = () => {
        if (username === '') {
            setUsernameError('empty');
        }else {
            setUsernameError('')
        }

        if (email === '') {
            setEmailError('empty');
        }else {
            setEmailError('')
        }

        if (description === '') {
            setDesciptionError('empty');
        }else {
            setDesciptionError('')
        }

        if (usernameError !== '' || emailError !== '' || desciptionError !== '') {
            return true;
        }
        return false;
    }

    return (
        <Container className='mt-4'>
            <Row>
                <Col className='mt-2 mb-2' xs={{ span: 6, offset: 3 }}>
                    <h1 className='text-center'>Create a ticket</h1>
                </Col>
            </Row>
            <Row>
                <Col xs={{ span: 6, offset: 3 }}>
                    <form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" onChange={(e) => setUsername(e.target.value)} />
                            {usernameError === 'empty' ? <Form.Label className='text-danger'> Enter your name</Form.Label> : null}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                            <Form.Text className="text-muted">
                            </Form.Text>
                            {emailError === 'empty' ? <Form.Label className='text-danger'> Enter your email</Form.Label> : null}
                      
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Label>Comments</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '100px' }}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            {desciptionError === 'empty' ? <Form.Label className='text-danger'> Enter a description</Form.Label> : null}
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

export default Create;