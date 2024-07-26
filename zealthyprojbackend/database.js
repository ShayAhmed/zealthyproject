import mysql from 'mysql2';

import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();


export async function getTickets(){
    const [result] = await pool.query("select * from tickets");
    return result
}

export async function getTicketById(id) {
    const [result] = await pool.query(`
        select * from tickets where id=?
        `, [id]);
    return result[0]
}

export async function createTicket(name, email, description) {
    const [result] = await pool.query(`
        insert into tickets (username, email, desrciption, ticket_status)
        values (?,?,?,?) 
        `, [name, email, description, 'New']);
    
    const id= result.insertId;
    return getTicketById(id);
}

export async function updateTicket(id, comment, status) {
    const [result] = await pool.query(`
        update tickets
        set admin_comment = ?, ticket_status=?
        where id=?
        `, [comment, status, id]);
    return getTicketById(id);
}

// const tickets = await getTickets();
// const t = await getTicketById(100);
// const add = await createTicket('jim', 'jim@gmail.com', 'descruption')
// console.log(tickets);
// console.log(t);
// console.log(add);