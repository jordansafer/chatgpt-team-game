import React from 'react';
import Sprite from './Sprite';

const GameArea = () => {
  return (
    <div className="game-area">
      <Sprite type="user" startPosition={{ x: 0, y: 0 }} />
      <Sprite type="gpt" startPosition={{ x: 0, y: 'bottom' }} />
    </div>
  );
};

export default GameArea;
