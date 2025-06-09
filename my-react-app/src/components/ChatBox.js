import React, { useState, useEffect } from 'react';

const ChatBox = ({ isDark, toggleTheme }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [sessionId] = useState(Date.now());
  const [samples, setSamples] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchSamples = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/samples/');
        const data = await res.json();
        setSamples(data);
      } catch (err) {
        console.error("Error fetching sample products:", err);
      }
    };
    fetchSamples();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const now = new Date().toLocaleTimeString();
    const userMsg = { sender: 'user', text: input, time: now };
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);

    await fetch('http://localhost:8000/api/chatlog/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        session_id: sessionId,
        message: input,
        sender: 'user',
      }),
    });

    const res = await fetch('http://localhost:8000/api/search/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: input }),
    });

    const data = await res.json();
    const botText =
      data.length > 0
        ? data.map(p => `${p.name} - ₹${p.price}`).join('\n')
        : 'No products found.';

    const botMsg = {
      sender: 'bot',
      text: botText,
      time: new Date().toLocaleTimeString(),
    };

    await fetch('http://localhost:8000/api/chatlog/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        session_id: sessionId,
        message: botText,
        sender: 'bot',
      }),
    });

    setMessages(prev => [...prev, botMsg]);
    setInput('');
    setTyping(false);
  };

  const handleReset = () => {
    setMessages([]);
    setInput('');
    setTyping(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-blue-200 dark:bg-gray-900 p-6 rounded-xl shadow-xl border dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300">🛒 ShopAssist</h2>
        <div className="flex items-center gap-4 text-sm">
          <button onClick={handleReset} className="hover:underline text-gray-600 dark:text-red-400">Reset</button>
          <button onClick={handleLogout} className="hover:underline text-gray-600 dark:text-blue-400">Logout</button>
          <button onClick={toggleTheme} className="text-xl">
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      {/* Chat Display */}
      <div className="h-64 overflow-y-auto space-y-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[70%] px-4 py-2 rounded-lg text-sm whitespace-pre-line ${
                m.sender === 'user'
                  ? 'bg-gray-500 text-white rounded-br-none'
                  : 'bg-gray-200 text-black dark:bg-green-700 dark:text-white rounded-bl-none'
              }`}
            >
              <p>{m.text}</p>
              <p className="text-[10px] mt-1 text-right opacity-70">{m.time}</p>
            </div>
          </div>
        ))}
        {typing && <div className="text-sm italic text-gray-500 dark:text-gray-300">Bot is typing...</div>}
      </div>

      {/* Input Box */}
      <div className="mt-4 flex items-center gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask about a product..."
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Send
        </button>
      </div>

      {/* Samples Section */}
      {samples.length > 0 && (
        <div className="mt-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-2">🔍 Popular Products:</h3>
          <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-200">
            {samples.map((p, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-blue-500">•</span>
                <span>{p.name} - ₹{parseFloat(p.price).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
