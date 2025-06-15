import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container" style={{ marginLeft: "36rem" }}>
      <h1>Welcome to Event Ticketing</h1>
      <p>Book tickets for your favorite events!</p>
      <Link to="/login" className="btn">Login</Link>
      <Link to="/register" className="btn">Register</Link>
    </div>
  );
}

export default Home;
