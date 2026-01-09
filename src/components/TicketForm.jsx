import { useState } from "react";
import { getTickets, saveTickets, generateTicketId } from "../utils/localStorage";

function TicketForm({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Bug");
  const [priority, setPriority] = useState("Low");
  const [reporter, setReporter] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (title.trim().length < 5) {
      setPopupMessage("Error: Title must be at least 5 characters.");
      setShowPopup(true);
      return;
    }
    if (description.trim().length < 20) {
      setPopupMessage("Error: Description must be at least 20 characters.");
      setShowPopup(true);
      return;
    }
    if (reporter.trim() === "") {
      setPopupMessage("Error: Reporter Name is required.");
      setShowPopup(true);
      return;
    }

    try {
      const newTicket = {
        id: generateTicketId(),
        title: title.trim(),
        description: description.trim(),
        category,
        priority,
        status: "Open",
        reporter: reporter.trim(),
        createdDate: new Date().toISOString(),
      };

      const tickets = getTickets();
      tickets.push(newTicket);
      saveTickets(tickets);

      setPopupMessage("Success: Ticket created successfully!");
      setShowPopup(true);

      // Optional callback to navigate after popup closes
      if (onSuccess) {
        setTimeout(() => onSuccess(), 1200);
      }

      // Clear form
      setTitle("");
      setDescription("");
      setCategory("Bug");
      setPriority("Low");
      setReporter("");
    } catch (error) {
      setPopupMessage("Error: Could not create ticket.");
      setShowPopup(true);
      console.error(error);
    }
  };

  return (
    <>
      <form className="create-ticket-card" onSubmit={handleSubmit}>
        <h2>Create Ticket</h2>

        <label>Title</label>
        <input
          placeholder="Min 5 characters"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description</label>
        <textarea
          placeholder="Min 20 characters"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Bug</option>
          <option>Request</option>
          <option>Support</option>
        </select>

        <label>Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <label>Reporter Name</label>
        <input
          placeholder="Reporter Name"
          value={reporter}
          onChange={(e) => setReporter(e.target.value)}
        />

        <button className="btn" type="submit">
          Create Ticket
        </button>
      </form>

      {/* Popup Modal */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-box">
            <h3>{popupMessage.includes("Success") ? "Success" : "Error"}</h3>
            <p>{popupMessage}</p>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </>
  );
}

export default TicketForm;
