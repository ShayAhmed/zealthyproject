'use client';

import { API_URL } from './constants';

export const postNewTicket = async (username, email, description) => {
  console.log(username, email, description);

  try {
    const response = await fetch(`${API_URL}/tickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
        "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"

      },
      body: JSON.stringify({ 'username': username, 'email': email, 'description': description })
    });
    return response.status;
  } catch (error) {
    console.error('Error submitting ticket:', error);
    throw error;
  }
}

export const fetchTicketsData = async (pageNumber) => {
  try {
    const response = await fetch(`${API_URL}/tickets`, {
      method: 'GET',
      headers: {
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
        "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"

      }
    })
    return await response.json();
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
};

export const fetchTicketsById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/tickets/${id}`, {
      method: 'GET',
      headers: {
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
        "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"

      }
    })
    return await response.json();
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
};

export const updateTicket = async (id, admin_comment, ticket_status) => {
  try {
      const response = await fetch(`${API_URL}/tickets`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
        "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"

      },
      body: JSON.stringify({ 'id': id, 'admin_comment': admin_comment, 'ticket_status': ticket_status })
    })
    return await response.json()
  } catch (error) {
    console.error('Error updating tickets:', error);
    throw error;
  }
};