import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    if (!agree) {
      alert("Please agree to the Terms and Conditions.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    alert(`Registered:\nName: ${fullName}\nEmail: ${email}`);
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <div style={{ textAlign: "left", margin: "10px 0" }}>
          <input
            type="checkbox"
            id="agree"
            checked={agree}
            onChange={() => setAgree(!agree)}
          />
          <label htmlFor="agree" style={{ marginLeft: "8px" }}>
            I agree to the Terms and Conditions
          </label>
        </div>

        <button type="submit" className="btn">Register</button>
      </form>

      <p style={{ marginTop: "10px" }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
