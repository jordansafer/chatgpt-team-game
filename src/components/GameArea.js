import React, { useState, useEffect, useCallback } from 'react';
import Sprite from './Sprite';

import './GameArea.css';

const MAX_Y = 400;
const MAX_X = 800;
const SIDE_LEN = 90;
const SPRITE_LEN = 50;
const MAX_TARGET_X = MAX_X - SIDE_LEN;
const MAX_TARGET_Y = MAX_Y - SIDE_LEN;
const MAX_MOVE_X = MAX_X - SPRITE_LEN;
const MAX_MOVE_Y = MAX_Y - SPRITE_LEN;

const GameArea = ({ gptResponse }) => {
  const [userPosition, setUserPosition] = useState({ x: 0, y: 0 });
  const [gptPosition, setGptPosition] = useState({ x: 0, y: MAX_MOVE_Y }); // Assuming '200' is the bottom position
  const [target1Position, setTarget1Position] = useState({ x: MAX_TARGET_X, y: 0 });
  const [target2Position, setTarget2Position] = useState({ x: MAX_TARGET_X, y: MAX_TARGET_Y });

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Handling user sprite movement
      let newUserPosition = { ...userPosition };
      switch (e.key) {
        case 'ArrowUp':
          newUserPosition.y = Math.max(0, newUserPosition.y - 10); // Move up and prevent moving out of game area
          break;
        case 'ArrowDown':
          newUserPosition.y = Math.min(MAX_MOVE_Y, newUserPosition.y + 10); // Move down and prevent moving out of game area
          break;
        case 'ArrowLeft':
          newUserPosition.x = Math.max(0, newUserPosition.x - 10); // Move left and prevent moving out of game area
          break;
        case 'ArrowRight':
          newUserPosition.x = Math.min(MAX_MOVE_X, newUserPosition.x + 10); // Move right and prevent moving out of game area
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

    const checkWinCondition = useCallback(() => {
        const isOverlapping = (spritePos, targetPos) => {
            // if sprite is within sprite length from the top left
            // or target is within sprite length from the top left then its overlapping
            const x_len_limit = spritePos.x < targetPos.x ? SPRITE_LEN : SIDE_LEN;
            const y_len_limit = spritePos.y < targetPos.y ? SPRITE_LEN : SIDE_LEN;

            // check if difference in pos is less than side length
            const xDiff = Math.abs(spritePos.x - targetPos.x);
            const yDiff = Math.abs(spritePos.y - targetPos.y);
            return xDiff < x_len_limit && yDiff < y_len_limit;
        };

        const userOnButton = isOverlapping(userPosition, target1Position);
        const gptOnButton = isOverlapping(gptPosition, target1Position);

        const userOnButton2 = isOverlapping(userPosition, target2Position);
        const gptOnButton2 = isOverlapping(gptPosition, target2Position);

        if ((userOnButton && gptOnButton2) || (userOnButton2 && gptOnButton)) {
          alert("You won the game!");

          // set target positions to random positions between 0 and max x/y
            setTarget1Position({ x: Math.floor(Math.random() * MAX_TARGET_X), y: Math.floor(Math.random() * MAX_TARGET_Y) });
            setTarget2Position({ x: Math.floor(Math.random() * MAX_TARGET_X), y: Math.floor(Math.random() * MAX_TARGET_Y) });
        }
      }, [userPosition, gptPosition, target1Position, target2Position]);

    useEffect(() => {
        setTimeout(() => {
            checkWinCondition();
        }, 1000);
    }, [userPosition, gptPosition, checkWinCondition]);
      
      return (
        <div style={{display: "flex"}}>
            <div className="game-instructions">
                <h2>Instructions</h2>
                <p>Use the arrow keys to move the blue sprite.</p>
                <p>Use the chat interface to move the green sprite.</p>
                <p>Get both sprites on the target buttons to win!</p>
            </div>
       <div className="game-area">
          <Sprite
            className="sprite"
            type="user"
            position={userPosition}
            setPosition={setUserPosition}
          />
          <Sprite
            className="sprite"
            type="gpt"
            position={gptPosition}
            setPosition={setGptPosition}
          />
          <div className="target-button" style={{ top: target1Position.y, left: target1Position.x }}>Target 1</div>
          <div className="target-button" style={{ top: target2Position.y, left: target2Position.x }}>Target 2</div>
        </div>
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
            const x = Math.max(0, Math.min(MAX_MOVE_X, instruction.newX));
            const y = Math.max(0, Math.min(MAX_MOVE_Y, instruction.newY));
            return { x, y };
        }
      }
    } catch (error) {
      console.error('Error parsing movement instruction:', error);
    }
    return null;
  }
  

export default GameArea;

