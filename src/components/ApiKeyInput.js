import React, { useState } from 'react';

function ApiKeyInput({ onSubmit }) {
  const [inputKey, setInputKey] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(inputKey);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter your OpenAI API Key:
        <input
          type="text"
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ApiKeyInput;
