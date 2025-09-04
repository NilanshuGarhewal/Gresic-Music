import { useState } from "react";
import AdminPanel from "./AdminPanel";

const Admin = () => {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const key = process.env.REACT_APP_MY_SECRET;

  const handleLogin = () => {
    if (password === key) {
      setAuthorized(true);
      setError("");
    } else {
      setError("Wrong password! Try again.");
    }
  };

  if (!authorized) {
    return (
      <div
        style={{
          maxWidth: "400px",
          margin: "100px auto",
          padding: "20px",
          textAlign: "center",
          border: "1px solid #ccc",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2>Admin Access</h2>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            margin: "15px 0",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleLogin}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </div>
    );
  }

  return <AdminPanel />;
};

export default Admin;
