import React, { useState, useEffect } from "react";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rememberMe) {
      localStorage.setItem("savedEmail", email);
      localStorage.setItem("savedPassword", password);
    } else {
      localStorage.removeItem("savedEmail");
      localStorage.removeItem("savedPassword");
    }

    alert("Sign up complete!");
  };

  const handleCancel = () => {
    setEmail("");
    setPassword("");
    setRememberMe(false);
  };

  return (
    <div style={styles.container}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </label>
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Remember email/password
        </label>
        <div style={styles.buttonContainer}>
          <button type="button" onClick={handleCancel} style={styles.button}>
            Cancel
          </button>
          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#d9d9d9",
    padding: "40px 20px",
    width: "280px",
    margin: "50px auto",
    textAlign: "center",
    borderRadius: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginTop: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    backgroundColor: "#6666cc",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    marginTop: "5px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  button: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#6666cc",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
    margin: "0 5px",
  },
};

export default SignUpPage;
