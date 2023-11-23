import React, { useState, useEffect } from 'react';
import Sprite from './Sprite';

const GameArea = ({ gptResponse }) => {
  const [userPosition, setUserPosition] = useState({ x: 0, y: 0 });
  const [gptPosition, setGptPosition] = useState({ x: 0, y: 200 }); // Assuming '200' is the bottom position

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Handling user sprite movement
      let newUserPosition = { ...userPosition };
      switch (e.key) {
        case 'ArrowUp':
          newUserPosition.y = Math.max(0, newUserPosition.y - 10); // Move up and prevent moving out of game area
          break;
        case 'ArrowDown':
          newUserPosition.y = Math.min(390, newUserPosition.y + 10); // Move down and prevent moving out of game area
          break;
        case 'ArrowLeft':
          newUserPosition.x = Math.max(0, newUserPosition.x - 10); // Move left and prevent moving out of game area
          break;
        case 'ArrowRight':
          newUserPosition.x = Math.min(390, newUserPosition.x + 10); // Move right and prevent moving out of game area
          break;
        default:
          break;
      }
      setUserPosition(newUserPosition);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [userPosition, setUserPosition]);

  // when gpt response changes, move the gpt sprite
    useEffect(() => {
        if (!gptResponse) {
            console.log('No GPT response', gptResponse);
            return;
        }

        const gptPosition = parseMovementInstruction(gptResponse);
        if (!gptPosition) {
            console.log('No GPT position', gptPosition, gptResponse);
            return;
        }

        setGptPosition(gptPosition);
    }, [gptResponse]);

  return (
    <div className="game-area">
      <Sprite
        type="user"
        position={userPosition}
        setPosition={setUserPosition}
      />
      <Sprite
        type="gpt"
        position={gptPosition}
        setPosition={setGptPosition}
      />
    </div>
  );
};

function parseMovementInstruction(responseContent) {
    try {
      // Define the markers that indicate the start and end of the JSON string
      const jsonStartMarker = '[JSON]';
      const jsonEndMarker = '[/JSON]';
  
      // Find the start and end indices of the JSON string
      console.log('Response content', responseContent);
      if (!responseContent || responseContent.length === 0) {
        console.log('No response content', responseContent);
        return null;
      }
      const startIndex = responseContent.indexOf(jsonStartMarker);
      const endIndex = responseContent.indexOf(jsonEndMarker);
  
      // Check if both markers are found
      if (startIndex !== -1 && endIndex !== -1) {
        // Extract the JSON string
        const jsonString = responseContent.substring(
          startIndex + jsonStartMarker.length,
          endIndex
        ).trim();
  
        // Parse the JSON string
        const instruction = JSON.parse(jsonString);
        if (instruction.newX !== undefined && instruction.newY !== undefined) {
          return { x: parseInt(instruction.newX), y: parseInt(instruction.newY) };
        }
      }
    } catch (error) {
      console.error('Error parsing movement instruction:', error);
    }
    return null;
  }
  

export default GameArea;

