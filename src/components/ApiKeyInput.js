import React, { useState } from 'react';

import './ApiKeyInput.css';

function ApiKeyInput({ onSubmit }) {
  const [inputKey, setInputKey] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(inputKey);
  };

  return (
<form onSubmit={handleSubmit} className="api-key-form">
  <label className="api-key-label">
    Enter your OpenAI API Key (stored locally)
    <input
      type="text"
      value={inputKey}
      onChange={(e) => setInputKey(e.target.value)}
      className="api-key-input"
    />
  </label>
  <button type="submit" className="submit-button">Submit</button>
</form>
  );
}

export default ApiKeyInput;
