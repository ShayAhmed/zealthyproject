import { useState } from 'react';
import { Alert, Badge, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { updateTicket } from '../../utils/request';
import { Ticket } from '../../utils/Ticket';
import React from 'react';
import { alertFailedEmailText, alertSuccessEmailText } from '../../utils/constants';



const TicketItem = (props: any) => {

    const temoraryTicket: Ticket = {
        ticket_status: '',
        username: '',
        admin_comment: '',
        email: '',
        created: '',
        id: null
    }

    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [status, setStatus] = useState('In Progress');
    const [updated_ticket, setUpdated_ticket] = useState(temoraryTicket);
    const [commentError, setCommentError] = useState<string | null>(null)
    const [statusError, setStatusError] = useState<string | null>(null)
    const [alert, setAlert] = useState('')


    const addText = () => {
        setOpen(!open);
        setAlert('');
    }

    const getColor = (status: string) => {
        switch (status) {
            case 'Resolved':
                return 'success';
            case 'In Progress':
                return 'warning';
            case 'New':
                return 'primary';
            default:
                return 'danger';
        }
    }

    const handleError = () => {
        var checkCommentError = false;
        var checkStatusError = false;

        if (comment === '') {
            checkCommentError = true;
            setCommentError('No Comment');
        } else {
            setCommentError('');
        }

        if (status === 'Update Status' || status === '') {
            checkStatusError = true;
            setStatusError('No Status');
        } else {
            setStatusError('');
        }

        return checkCommentError || checkStatusError;
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (handleError() === true) {
            return;
        }

        setStatusError('');
        setCommentError('');
        try {
            var response = await updateTicket(props.ticket_data.id, comment, status)
            setUpdated_ticket(response);
            setAlert(alertSuccessEmailText)
        } catch (error) {
            setAlert(alertFailedEmailText);
        }
        setComment('');
    };

    const handleChange = (e: any) => {
        const newValue = e.target.value;
        setStatus(newValue);
    }

    return (
        <Container className='mt-2 mb-2 border py-2'>
            <Col onClick={() => addText()}>
                <Row>
                    <Col className='me-auto col-auto'>
                        <div>
                            <div className='fw-bold'>{props.ticket_data.username}</div>
                            <div className='text-muted'>{props.ticket_data.email}</div>
                        </div>
                    </Col>
                    <Col className='mt-2 col-auto'>
                        <h3>
                            <Badge pill bg={updated_ticket.ticket_status === '' ? getColor(props.ticket_data.ticket_status) : getColor(updated_ticket.ticket_status)}>{updated_ticket.ticket_status === '' ? props.ticket_data.ticket_status : updated_ticket.ticket_status}</Badge>
                        </h3>
                    </Col>
                </Row>
            </Col>

            {open &&
                <Col>
                    <Row className='mt-3 mb-3'>
                        <Col>
                            <Card bg='light' key='Light'>
                                <Card.Header as="h5">{props.ticket_data.username}'s comment</Card.Header>
                                <Card.Body>
                                    <Card.Text>{props.ticket_data.desrciption}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Form>
                        <Form.Label className='d-block'><h5>Leave a comment for {props.ticket_data.username}</h5></Form.Label>
                        <Row className='mt-2 mb-2'>
                            <Col xs={8}>
                                <Form.Control
                                    as="textarea"
                                    style={{ height: '120px' }}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                {commentError === 'No Comment' ? <Form.Label className='text-danger d-block mt-2'> Enter a comment</Form.Label> : null}
                            </Col>
                            <Col xs={4}>
                            
                                <Row className='me-2 d-flex'><Form.Group>
                                <Form.Label className='d-block'><h5>Update Status</h5></Form.Label>
                                    <Form.Control
                                        as="select"
                                        type='text'
                                        onChange={handleChange}
                                        defaultValue='In Progress'
                                    >
                                        <option value="In Progress">In Progress</option>
                                        <option value="Resolved">Resolved</option>
                                    </Form.Control>
                                    <Col className='d-grid gap-2'><Button style={{ backgroundColor: '#5D3FD3', borderColor: '#5D3FD3' }} className='mt-2' type='submit' onClick={handleSubmit}>Submit</Button></Col></Form.Group>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                    <Col className='mt-3'>
                        {alert !== '' ?
                            <Alert key={alert === alertSuccessEmailText ? 'success' : 'danger'} variant={alert === alertSuccessEmailText ? 'success' : 'danger'}>
                                {alert} to {props.ticket_data.username}
                            </Alert>
                            : null
                        }</Col>
                </Col>
            }
        </Container>
    )
}

export default TicketItem