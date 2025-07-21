import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (input.trim() === '') {
        setSuggestions([]);
        return;
      }

      const response = await fetch(`http://localhost:5000/autocomplete/${input}`);
      const data = await response.json();
      setSuggestions(data);
    };

    fetchSuggestions();
  }, [input]);  // Automatically runs whenever "input" changes

  return (
    <div className="container">
      <h1>Dictify Search</h1>
      <input
        type="text"
        placeholder="Type a word..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="suggestions">
        {suggestions.map((item, index) => {
          const boldPart = input;
          const remaining = item.slice(input.length);

          return (
            <div key={index}>
              <strong>{boldPart}</strong>{remaining}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
