import { Link, useNavigate } from "react-router-dom";

function NavBar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Dashboard</Link>
      <Link to="/tickets">Ticket List</Link>
      <Link to="/create">Create Ticket</Link>

      <button
        style={{ float: "right", marginLeft: "10px" }}
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <button
        style={{ float: "right" }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
}

export default NavBar;
