import TicketForm from "../components/TicketForm";
import { useNavigate } from "react-router-dom";

function CreateTicket() {
  const navigate = useNavigate();

  return (
    <div className="create-ticket-page">
      <TicketForm onSuccess={() => navigate("/")} />
    </div>
  );
}

export default CreateTicket;
