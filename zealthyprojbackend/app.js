import express from 'express';
import { getTickets, getTicketById, createTicket, updateTicket } from './database.js'
import cors from 'cors';

const app = express();
app.use(express.json())
app.use(cors())


app.get('/tickets', async (req, res) => {
    const notes = await getTickets();
    res.send(notes);
})

app.get('/tickets/:id', async (req, res) => {
    const id = req.params.id;
    const notes = await getTicketById(id);
    res.send(notes);
})

app.post('/tickets', async (req, res) => {
    const {username, email, description} = req.body;
    const notes = await createTicket(username,email, description);
    res.status(201).send(notes);
})

app.patch('/tickets', async (req, res) => {
    const {id, admin_comment, ticket_status} = req.body;
    const notes = await updateTicket(id,admin_comment, ticket_status);
    res.send(notes);
})

app.patch('/tickets/:id', async (req, res) => {
    const {id} = req.query;
    const notes = await getTicketById(id);
    res.send(notes);
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.listen(8080, () => {
    console.log('Running on 8080');
})  