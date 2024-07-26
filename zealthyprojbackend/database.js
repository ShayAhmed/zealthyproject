//import mysql from 'mysql2';

import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';
dotenv.config();

// const pool = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE
// }).promise();

const pools = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: 5432, // default Postgres port
    database: process.env.POSTGRES_DATABASE,
    ssl:true
  });

console.log(process.env.POSTGRES_USER)

export async function getTickets(){
    const result = await pools.query("select * from tickets");
    return result.rows;
}

export async function getTicketById(id) {
    const result = await pools.query(`
        select * from tickets where id = $1
        `, [id]);
    return result.rows[0]
}

export async function createTicket(name, email, description) {
    const result = await pools.query(`
        insert into tickets (username, email, desrciption, ticket_status)
        values ($1,$2,$3,$4) returning *
        `, [name, email, description, 'New']);
    return result.rows[0];
}

export async function updateTicket(id, comment, status) {
    const result = await pools.query(`
        update tickets
        set admin_comment = $1, ticket_status=$2
        where id=$3 returning *
        `, [comment, status, id]);
    return result.rows[0];
}