import React from 'react';

const Sprite = ({ type, position, setPosition }) => {
  // Style remains the same
  const style = {
    position: 'absolute',
    width: '50px',
    height: '50px',
    backgroundColor: type === 'user' ? 'blue' : 'green',
    left: `${position.x}px`,
    top: `${position.y}px`,
  };

  return <div style={style} />;
};

export default Sprite;

