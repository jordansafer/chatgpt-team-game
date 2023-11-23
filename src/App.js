import React, { useState } from 'react';
import './App.css';
import ApiKeyInput from './components/ApiKeyInput';
import ChatInterface from './components/ChatInterface';

function App() {
  const [apiKey, setApiKey] = useState(localStorage.getItem('openai_api_key') || '');

  const handleApiKeySubmit = (key) => {
    localStorage.setItem('openai_api_key', key);
    setApiKey(key);
  };

  return (
    <div className="App">
      <header className="App-header">
        {!apiKey && <ApiKeyInput onSubmit={handleApiKeySubmit} />}
        {apiKey && <ChatInterface apiKey={apiKey} />}
      </header>
    </div>
  );
}

export default App;

