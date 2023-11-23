import React, { useState } from 'react';
import axios from 'axios';
import './ChatInterface.css';

function ChatInterface({ apiKey, setGptResponse }) {
  const [inputText, setInputText] = useState('');
  const [conversation, setConversation] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inputText.trim()) return;
    
    const preInstruction = "Please respond with the GPT sprite's movement in JSON format, enclosed in [JSON] and [/JSON] markers. Example: [JSON]{\"newX\": 10, \"newY\": 20}[/JSON]\n";

    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: conversation.concat({ role: "user", content: preInstruction + inputText }),
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

      // Parse the response to get movement instructions
      setGptResponse(newMessage.content);

      setInputText('');
    } catch (error) {
      console.error('Error during API request:', error);
      // Handle the error as per your application's needs
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        {conversation.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <strong>{msg.role === 'user' ? 'You:' : 'ChatGPT:'}</strong> {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-form">
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Tell GPT what you'd like to it to do next..."
        onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
            }
        }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
  

export default ChatInterface;

