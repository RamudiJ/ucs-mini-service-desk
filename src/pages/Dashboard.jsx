import { Link } from "react-router-dom";
import { getTickets } from "../utils/localStorage";

function Dashboard() {
  const tickets = getTickets();

  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "Open").length;
  const inProgress = tickets.filter((t) => t.status === "In Progress").length;
  const resolved = tickets.filter((t) => t.status === "Resolved").length;

  return (
    <div>
      <h2>Dashboard</h2>

      <div className="dashboard-stats">
  <div className="stat-card">
    Total Tickets
    <strong>{total}</strong>
  </div>

  <div className="stat-card">
    Open
    <strong>{open}</strong>
  </div>

  <div className="stat-card">
    In Progress
    <strong>{inProgress}</strong>
  </div>

  <div className="stat-card">
    Resolved
    <strong>{resolved}</strong>
  </div>
</div>

<Link to="/tickets" className="action-card">
  View All Tickets →
</Link>

<Link to="/create" className="action-card primary">
  + Create New Ticket
</Link>

    </div>
  );
}

export default Dashboard;
