import { useState } from 'react';
import { Badge, Button, Col, Container, Dropdown, Form, ListGroupItem, Row } from "react-bootstrap";
import { updateTicket } from '../../utils/request';
import { Ticket } from '../../utils/Ticket';
import { useEffect } from 'react';
import React from 'react';



const TicketItem = (props: any) => {

    const temoraryTicket: Ticket = {
        ticket_status: '',
        username: '',
        admin_comment: '',
        email: ''
    }

    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [commentHistory, setCommentHistory] = React.useState<string[]>([])
    const [status, setStatus] = useState('');
    const [updated_ticket, setUpdated_ticket] = useState(temoraryTicket);
    const [commentError, setCommentError] = useState<string | null>(null)
    const [statusError, setStatusError] = useState<string | null>(null)


    useEffect(() => {
        console.log(props.ticket_data.desrciption)
    }, []);


    const addText = () => {
        setOpen(!open);
        console.log(props.ticket_data.id);
        console.log(comment);
        console.log(status);
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
            console.log(response);

            //setSnackMessage('Ticket submitted successfully.');

        } catch (error) {
            console.error('Error submitting ticket:', error);
            //setSnackMessage('Error submitting ticket.');
        }
        //setOpenSnack(true);
        setCommentHistory([...commentHistory, comment]);
        setComment('');
        setOpen(false);
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
                    <Row className='mt-2 mb-2'>
                        <Col>
                            <Form.Label>{props.ticket_data.username}'s description</Form.Label>
                            <Form.Control type="text" placeholder={props.ticket_data.desrciption} readOnly />
                            {updated_ticket.admin_comment == '' ?  null : <Form.Label>Your most recent comment</Form.Label>}
                            <div>
                                {updated_ticket.admin_comment === '' ? null
                                :<Form.Control type="text" className='mt-1 mb-1' placeholder={updated_ticket.admin_comment} readOnly />
                                }
                            </div>
                            
                        </Col>
                    </Row>
                    <Row className='mt-2 mb-2'>
                        <Col xs={8}>
                            <Form.Label>Leave a comment for {props.ticket_data.username}</Form.Label>
                            <Form.Control
                                as="textarea"
                                style={{ height: '100px' }}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            {commentError === 'No Comment' ? <Form.Label className='text-danger'> Enter a comment</Form.Label> : null}
                        </Col>
                        <Col xs={3} className='mt-auto'>
                            <Row className='mt-2'>
                                <Form.Select aria-label="Default select example" onChange={(e) => setStatus(e.target.value)}>
                                    <option>Update Status</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                </Form.Select>
                                {statusError === 'No Status' ? <Form.Label className='text-danger'>Select a valid status</Form.Label> : null}
                            </Row>
                            <Row >
                                <Button className='d-grid gap-2 mt-2' onClick={(e) => handleSubmit(e)}>Submit</Button>
                            </Row>

                        </Col>

                    </Row>
                </Col>
            }

        </Container>
    )
}

export default TicketItem