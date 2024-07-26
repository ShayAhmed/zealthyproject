import { useEffect, useState } from "react";
import { fetchTicketsData } from "../../utils/request";
import { Accordion, Badge, Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { Ticket } from "../../utils/Ticket";
import TicketItem from "./TicketItem";


const Admin = () => {
    const [tickets, setTickets] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [openSnack, setOpenSnack] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [open, setOpen] = useState(false);
    const [response, setResponse] = useState('');

    useEffect(() => {
        fetchTickets(page);
    }, [page]);

    const fetchTickets = async (pageNumber: number) => {
        try {
            const response = await fetchTicketsData(pageNumber);
            console.log('res', response);
            setTickets(response);
            //setTotalPages(response.data.pages);
        } catch (error) {
            console.error('Error fetching tickets:', error);
            //setSnackMessage('Error fetching tickets');
            //setOpenSnack(true);
        }
    };

    return (
        <Container className='mt-4'>
                {tickets.map((ticket: Ticket) => (
                    <TicketItem className='border' ticket_data={ticket}/>
                ))}
        </Container>
    );

}

export default Admin    