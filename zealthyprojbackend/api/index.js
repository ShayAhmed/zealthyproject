import express from 'express';
import { getTickets, getTicketById, createTicket, updateTicket } from '../database.js'
import cors from 'cors';

const app = express();
let corsOptions = {
    origin : ['https://zealthyproject-67yl.vercel.app','http://localhost:3000'],
 }
app.use(cors({origin:true,credentials: true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*').header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS").send('Hello World')
  })

app.get('/tickets', async (req, res) => {
    console.log('in get all');
    const notes = await getTickets();
    res.header('Access-Control-Allow-Origin', '*').header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS").send(notes);
})

app.get('/tickets/:id', async (req, res) => {
    console.log('in get by id');
    const id = req.params.id;
    const notes = await getTicketById(id);
    res.header('Access-Control-Allow-Origin', '*').header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS").send(notes);
})

app.post('/tickets', async (req, res) => {
    console.log('in add ticket');
    const {username, email, description} = req.body;
    const notes = await createTicket(username,email, description);
    res.header('Access-Control-Allow-Origin', '*').header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS").status(201).send(notes);
})

app.patch('/tickets', async (req, res) => {
    console.log('in update');
    const {id, admin_comment, ticket_status} = req.body;
    const notes = await updateTicket(id,admin_comment, ticket_status);
    res.header('Access-Control-Allow-Origin', '*').header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS").send(notes);
})

app.patch('/tickets/:id', async (req, res) => {
    console.log('in patch by id');
    const {id} = req.query;
    const notes = await getTicketById(id);
    res.header('Access-Control-Allow-Origin', '*').header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS").send(notes);
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.header('Access-Control-Allow-Origin', '*').header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS").status(500).send('Something broke!')
  })

app.listen(8080, () => {
    console.log('Running on 8080');
})  