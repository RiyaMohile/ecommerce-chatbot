import React, { useEffect, useState } from 'react';
import ChatBox from './components/ChatBox';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);
  const handleLogin = () => setIsLoggedIn(true);
  const handleToggleAuthPage = () => setShowSignup(prev => !prev);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center p-4">
      {/* <button
        onClick={toggleTheme}
        className="mb-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        Toggle {isDark ? 'Light' : 'Dark'} Mode
      </button> */}

      {isLoggedIn ? (
        <ChatBox isDark={isDark} toggleTheme={toggleTheme} />

      ) : showSignup ? (
        <>
          <Signup onSignup={handleToggleAuthPage} />
          <button onClick={handleToggleAuthPage} className="mt-2 text-sm text-blue-500 hover:underline">
            Already have an account? Login
          </button>
        </>
      ) : (
        <>
          <Login onLogin={handleLogin} />
          <button onClick={handleToggleAuthPage} className="mt-2 text-sm text-blue-500 hover:underline">
            Don’t have an account? Signup
          </button>
        </>
      )}
    </div>
  );
};

export default App;
