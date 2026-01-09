import { useState } from "react";
import { Link } from "react-router-dom";
import { getTickets } from "../utils/localStorage";

function TicketList() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const tickets = getTickets();

  const filteredTickets = tickets
    .filter(
      (t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase())
    )
    .filter((t) => (statusFilter ? t.status === statusFilter : true))
    .filter((t) => (priorityFilter ? t.priority === priorityFilter : true))
    .sort((a, b) => (sortOrder === "newest" ? b.id - a.id : a.id - b.id));

  return (
    <div className="ticket-container">
      <h2>Ticket List</h2>

      {/* Toolbar with flex */}
      <div className="ticket-toolbar">
        <input
          className="toolbar-item"
          placeholder="Search tickets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="toolbar-item"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>
        <select
          className="toolbar-item"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="">All Priority</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <select
          className="toolbar-item"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      <hr />

      {filteredTickets.length === 0 ? (
        <p>No tickets found</p>
      ) : (
        <ul className="ticket-list">
          {filteredTickets.map((ticket) => (
            <li key={ticket.id} className="ticket-card">
              <Link to={`/ticket/${ticket.id}`} className="ticket-link">
                <div className="ticket-title">
                  #{ticket.id} - {ticket.title}
                </div>
                <div className="ticket-meta">
                  <span>Status: {ticket.status}</span> •{" "}
                  <span>Priority: {ticket.priority}</span> •{" "}
                  <span>Category: {ticket.category}</span> •{" "}
                  <span>Reporter: {ticket.reporter}</span> •{" "}
                  <span>
                    Created: {new Date(ticket.createdDate).toLocaleString()}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TicketList;
