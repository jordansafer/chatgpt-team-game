import React from 'react';

import './ApiKeyReset.css';

function ApiKeyReset({ setApiKey }) {
  const handleReset = () => {
    localStorage.removeItem('openai_api_key');
    setApiKey('');
  };

  return (
    <div className='apireset'>
        <button className='reset-button' onClick={handleReset}>Reset API Key</button>
    </div>
  );
}

export default ApiKeyReset;