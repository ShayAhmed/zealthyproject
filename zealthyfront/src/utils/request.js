'use client';

import { API_URL } from './constants';

export const postNewTicket = async (username, email, description) => {
    console.log(username, email, description);
  
    try {
      const response = await fetch(`${API_URL}/tickets`,{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'username':username, 'email': email, 'description': description})
    });
    return response.status;
    //axios.post(`${API_URL}/tickets`, { name, email, description });
  } catch (error) {
    console.error('Error submitting ticket:', error);
    throw error;
  }
}

export const fetchTicketsData = async (pageNumber) => {
  try {
    const response = await fetch(`${API_URL}/tickets`,{
            method:'GET',
        })
    return await response.json();
    // const response = await axios.get(`${API_URL}/api/tickets?page=${pageNumber}&per_page=10`);
    // return response;
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
};

export const fetchTicketsById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/tickets/${id}`,{
            method:'GET',
        })
    return await response.json();
    // const response = await axios.get(`${API_URL}/api/tickets?page=${pageNumber}&per_page=10`);
    // return response;
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
};

export const updateTicket = async (id, admin_comment, ticket_status) => {
  try {
    const response = await fetch(`${API_URL}/tickets`,{
      method:'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'id':id, 'admin_comment': admin_comment, 'ticket_status': ticket_status})
  })
  return await response.json()
    // const response = await axios.get(`${API_URL}/api/tickets?page=${pageNumber}&per_page=10`);
    // return response;
  } catch (error) {
    console.error('Error updating tickets:', error);
    throw error;
  }
};

// export const fetchTicketDetails = async (ticketId) => {
//   try {
//     const response = await axios.get(`${API_URL}/api/tickets/${ticketId}`);
//     return response;
//   } catch (error) {
//     console.error('Error fetching ticket details:', error);
//     throw error;
//   }
// };

// export const updateTicketStatus = async (ticketId, newStatus) => {
//   try {
//     await axios.put(`${API_URL}/api/tickets/${ticketId}/status`, { status: newStatus });
//   } catch (error) {
//     console.error('Error updating status:', error);
//     throw error;
//   }
// };

// export const respondToTicket = async (ticketId, message) => {
//   try {
//     await axios.post(`${API_URL}/api/tickets/${ticketId}/respond`, { message });
//   } catch (error) {
//     console.error('Error submitting response:', error);
//     throw error;
//   }
// };