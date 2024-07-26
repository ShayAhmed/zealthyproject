import { useEffect, useState } from "react";
import { fetchTicketsData } from "../../utils/request";
import { Col, Container, Row } from "react-bootstrap";
import { Ticket } from "../../utils/Ticket";
import TicketItem from "./TicketItem";


const Admin = () => {
    const [tickets, setTickets] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchTickets(page);
    }, [page]);

    const fetchTickets = async (pageNumber: number) => {
        try {
            const response = await fetchTicketsData(pageNumber);
            console.log('res', response);
            const sorted_tickets = response
                .sort((a: Ticket, b: Ticket) => {
                    return +new Date(b.created) - +new Date(a.created);
                });
            setTickets(sorted_tickets);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    };

    return (
        <Container className='mt-4'>
            <Row>
                <Col className='mt-2 mb-2' xs={{ span: 6, offset: 3 }}>
                    <h1 className='text-center'>Create a ticket</h1>
                </Col>
            </Row>
            {tickets.map((ticket: Ticket) => (
                <TicketItem className='border' ticket_data={ticket} />
            ))}
        </Container>
    );

}

export default Admin    