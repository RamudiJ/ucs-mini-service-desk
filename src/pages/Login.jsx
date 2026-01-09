import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Demo credentials
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
  <div className="login-page">
    <form className="login-card" onSubmit={handleLogin}>
      <h2>Login</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p className="error-text">{error}</p>}

      <button type="submit">Login</button>

      <p className="login-hint">
        Demo: <strong>admin / admin123</strong>
      </p>
    </form>
  </div>
);

}

export default Login;
