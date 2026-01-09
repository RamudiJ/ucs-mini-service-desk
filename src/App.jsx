import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TicketList from "./pages/TicketList";
import CreateTicket from "./pages/CreateTicket";
import TicketDetails from "./pages/TicketDetails";
import ProtectedRoute from "./components/ProtectedRoute";

function AppContent({ darkMode, setDarkMode }) {
  const location = useLocation();

  const hideNav = location.pathname === "/login";

  return (
    <>
      {!hideNav && (
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
      )}

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tickets"
          element={
            <ProtectedRoute>
              <TicketList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateTicket />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ticket/:id"
          element={
            <ProtectedRoute>
              <TicketDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <BrowserRouter>
      <AppContent darkMode={darkMode} setDarkMode={setDarkMode} />
    </BrowserRouter>
  );
}

export default App;
