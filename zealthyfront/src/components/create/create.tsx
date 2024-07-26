import React from 'react';
import { useState } from 'react';
import { Alert, Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import { postNewTicket } from '../../utils/request';
import { alertFailedText, alertSuccessText } from '../../utils/constants';

const Create = () => {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [usernameError, setUsernameError] = useState<string | null>(null)
    const [emailError, setEmailError] = useState<string | null>(null)
    const [desciptionError, setDesciptionError] = useState<string | null>(null)
    const [alert, setAlert] = useState('')

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log('here');

        if (handleError() === true) {
            return;
        }

        e.target.reset();
        setAlert('');
        try {
            console.log(username);
            await postNewTicket(username, email, description)
                .then((res) => {
                    if (res === undefined) {
                        console.log('res was undefined')
                    }
                    console.log(res)
                })

            setUsername('');
            setEmail('');
            setDescription('');
            setAlert(alertSuccessText);
        } catch (error) {
            console.error('Error submitting ticket:', error);
            setAlert(alertFailedText);
        }
    };

    const handleError = () => {
        if (username === '') {
            setUsernameError('empty');
        } else {
            setUsernameError('')
        }

        if (email === '') {
            setEmailError('empty');
        } else {
            setEmailError('')
        }

        if (description === '') {
            setDesciptionError('empty');
        } else {
            setDesciptionError('')
        }

        if (usernameError !== '' || emailError !== '' || desciptionError !== '') {
            return true;
        }
        return false;
    }

    return (
        <Container className='mt-4'>
            {alert !== '' ?
                <Alert key={alert === alertSuccessText ? 'success' : 'danger'} variant={alert === alertSuccessText ? 'success' : 'danger'}>
                    {alert}
                </Alert>
                : null
            }
            <Row>
                <Col className='mt-2 mb-2' xs={{ span: 6, offset: 3 }}>
                    <h1 className='text-center'>Create a ticket</h1>
                </Col>
            </Row>
            <Row>
                <Col xs={{ span: 6, offset: 3 }}>
                    <form onSubmit={handleSubmit}>
                        <Row>
                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Label><h5>Name</h5></Form.Label>
                                <Form.Control type="text" placeholder="Enter Name" onChange={(e) => setUsername(e.target.value)} />
                                {usernameError === 'empty' ? <Form.Label className='text-danger'> Enter your name</Form.Label> : null}
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label><h5>Email</h5></Form.Label>
                                <Form.Control type="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
                                <Form.Text className="text-muted">
                                </Form.Text>
                                {emailError === 'empty' ? <Form.Label className='text-danger'> Enter your email</Form.Label> : null}

                            </Form.Group>

                        </Row>
                        <Row>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Label><h5>Comments</h5></Form.Label>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Leave a comment here"
                                    style={{ height: '100px' }}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                {desciptionError === 'empty' ? <Form.Label className='text-danger'> Enter a description</Form.Label> : null}
                            </Form.Group>
                        </Row>
                        <Row className='me-auto ms-auto'>
                            <Button style={{ backgroundColor: '#5D3FD3', borderColor:'#5D3FD3' }} type="submit">
                                Submit
                            </Button>
                        </Row>

                    </form>
                </Col>
            </Row>
        </Container>
    )
}

export default Create;