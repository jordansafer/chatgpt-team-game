import React, { useState, useEffect } from 'react';
import Sprite from './Sprite';

const GameArea = () => {
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

      // Add similar logic for the GPT sprite if needed
      // ...
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [userPosition, setUserPosition]);

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

export default GameArea;

