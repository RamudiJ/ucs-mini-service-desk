export function getTickets() {
  const tickets = localStorage.getItem("tickets");
  return tickets ? JSON.parse(tickets) : [];
}

export function saveTickets(tickets) {
  localStorage.setItem("tickets", JSON.stringify(tickets));
}

// Generate a unique ticket ID
export function generateTicketId() {
  const tickets = getTickets();
  if (tickets.length === 0) return 1; // first ticket
  return tickets[tickets.length - 1].id + 1; // increment last id
}
