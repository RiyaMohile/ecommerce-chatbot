import React, { useState } from 'react';

const Signup = ({ onSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Account created. Please log in.');
        setUsername('');
        setPassword('');
        onSignup(); // optionally switch to login
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-4 text-left text-blue-700">Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
