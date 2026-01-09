import { useParams, Link } from "react-router-dom";
import { getTickets, saveTickets } from "../utils/localStorage";
import { useState } from "react";

function TicketDetails() {
  const { id } = useParams();
  const ticketId = parseInt(id, 10);

  const tickets = getTickets();
  const ticket = tickets.find((t) => t.id === ticketId);

  const [status, setStatus] = useState(ticket?.status || "");
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState(ticket?.notes || []);

  if (!ticket) {
    return (
      <div className="container">
        <h2>Ticket not found</h2>
        <Link to="/tickets" className="back-link">← Back to Ticket List</Link>
      </div>
    );
  }

  const updateStatus = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    const updatedTickets = tickets.map((t) =>
      t.id === ticketId ? { ...t, status: newStatus } : t
    );

    saveTickets(updatedTickets);
  };

  const addNote = () => {
    if (!newNote.trim()) return;

    const updatedNotes = [...notes, { text: newNote, date: new Date().toLocaleString() }];
    setNotes(updatedNotes);
    setNewNote("");

    const updatedTickets = tickets.map((t) =>
      t.id === ticketId ? { ...t, notes: updatedNotes } : t
    );

    saveTickets(updatedTickets);
  };

  const downloadCSV = () => {
    let csv = `Title,Description,Priority,Reporter,Created,Status\n`;
    csv += `"${ticket.title}","${ticket.description}","${ticket.priority}","${ticket.reporter}","${ticket.createdDate}","${status}"\n\n`;
    csv += `Notes Date,Note\n`;
    notes.forEach(note => {
      csv += `"${note.date}","${note.text}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `ticket_${ticketId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
          <div className="ticket-details-page">
   

      <Link to="/tickets" className="back-btn">← Back to Ticket List</Link>

      <div className="ticket-card">
        <h2>{ticket.title}</h2>
        <p><strong>Ticket ID:</strong> #{ticket.id}</p> 
        <p><strong>Description:</strong> {ticket.description}</p>
        <p><strong>Priority:</strong> {ticket.priority}</p>
        <p><strong>Reporter:</strong> {ticket.reporter || "N/A"}</p>
        <p><strong>Created:</strong> {ticket.createdDate}</p>

        <label>Status:</label>
        <select value={status} onChange={updateStatus}>
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>

        <hr />

        <h3>Internal Notes</h3>
        <div className="notes-container">
          {notes.length === 0 ? (
            <p>No notes yet.</p>
          ) : (
            notes.map((note, index) => (
              <div key={index} className="note-card">
                <strong>{note.date}:</strong> {note.text}
              </div>
            ))
          )}
        </div>
      </div>
        <textarea
          placeholder="Add a note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <div className="button-group">
        <button onClick={addNote} className="btn">Add Note</button>
        <button onClick={downloadCSV} className="btn btn-csv">Download CSV</button>
      </div>
</div>
  );
}

export default TicketDetails;
