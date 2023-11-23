import React, { useState } from 'react';
import './App.css';
import ApiKeyInput from './components/ApiKeyInput';
import ChatInterface from './components/ChatInterface';
import GameArea from './components/GameArea'; // Import the GameArea component

function App() {
  const [apiKey, setApiKey] = useState(localStorage.getItem('openai_api_key') || '');
  const [gptResponse, setGptResponse] = useState('');

  const handleApiKeySubmit = (key) => {
    localStorage.setItem('openai_api_key', key);
    setApiKey(key);
  };

  return (
    <div className="App">
      <header className="App-header">
        {!apiKey && <ApiKeyInput onSubmit={handleApiKeySubmit} />}
        {apiKey && (
          <>
            <ChatInterface apiKey={apiKey} setGptResponse={setGptResponse} />
            <GameArea gptResponse={gptResponse} /> {/* Include the GameArea component */}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
