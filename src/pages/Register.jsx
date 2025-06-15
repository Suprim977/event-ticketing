import React from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Register Page</h2>
      <button onClick={() => navigate('/')} style={{ marginTop: '20px' }}>
        Back to Home
      </button>
    </div>
  );
}

export default Register;