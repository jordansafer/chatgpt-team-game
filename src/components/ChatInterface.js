import React, { useState } from 'react';
import axios from 'axios';

function ChatInterface({ apiKey }) {
  const [inputText, setInputText] = useState('');
  const [conversation, setConversation] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inputText.trim()) return;

    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: conversation.concat({ role: "user", content: inputText }),
      temperature: 0.7
    };

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const newMessage = {
        role: "assistant",
        content: response.data.choices[0].message.content
      };

      setConversation(conversation.concat({ role: "user", content: inputText }, newMessage));
      setInputText('');
    } catch (error) {
      console.error('Error during API request:', error);
      // Handle the error as per your application's needs
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
      <div>
        {conversation.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.role === 'user' ? 'left' : 'right' }}>
            <p><strong>{msg.role === 'user' ? 'You:' : 'ChatGPT:'}</strong> {msg.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatInterface;

