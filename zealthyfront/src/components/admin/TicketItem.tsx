import { useState } from 'react';
import { Alert, Badge, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { updateTicket } from '../../utils/request';
import { Ticket } from '../../utils/Ticket';
import React from 'react';
import { alertFailedText, alertSuccessEmailText } from '../../utils/constants';



const TicketItem = (props: any) => {

    const temoraryTicket: Ticket = {
        ticket_status: '',
        username: '',
        admin_comment: '',
        email: '',
        created: '',
        id : null
    }

    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [commentHistory, setCommentHistory] = React.useState<string[]>([])
    const [status, setStatus] = useState('');
    const [updated_ticket, setUpdated_ticket] = useState(temoraryTicket);
    const [commentError, setCommentError] = useState<string | null>(null)
    const [statusError, setStatusError] = useState<string | null>(null)
    const [alert, setAlert] = useState('')


    const addText = () => {
        setOpen(!open);
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
        if (comment === '') {
            setCommentError('No Comment');
        } else {
            setCommentError('');
        }

        if (status === 'Update Status' || status === '') {
            setStatusError('No Status');
        } else {
            setStatusError('');
        }

        if (commentError !== '' || statusError !== '') {
            return true;
        }
        return false;
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
            console.log(response);
        } catch (error) {
            console.error('Error submitting ticket:', error);
            setAlert(alertFailedText);
        }
        setCommentHistory([...commentHistory, comment]);
        setComment('');
    };

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
                    <Row className='mt-2 mb-2'>
                        <Col xs={8}>
                            <Form.Label><h5>Leave a comment for {props.ticket_data.username}</h5></Form.Label>
                            <Form.Control
                                as="textarea"
                                style={{ height: '100px' }}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            {commentError === 'No Comment' ? <Form.Label className='text-danger'> Enter a comment</Form.Label> : null}
                        </Col>
                        <Col xs={4} className='mt-auto'>
                            <Row className='mt-2 me-2'>
                                <Form.Select aria-label="Default select example" onChange={(e) => setStatus(e.target.value)}>
                                    <option>Update Status</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                </Form.Select>
                                {statusError === 'No Status' ? <Form.Label className='text-danger'>Select a valid status</Form.Label> : null}
                            </Row>
                            <Row className='mt-2 me-1'>
                                <Button style={{ backgroundColor: '#5D3FD3', borderColor:'#5D3FD3' }} className='d-grid gap-2 mt-2' onClick={(e) => handleSubmit(e)}>Submit</Button>
                            </Row>
                        </Col>
                    </Row>
                    <Col className='mt-4'>
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