import React from 'react';

const Sprite = ({ type, position, setPosition, name }) => {
  // Style remains the same
  const style = {
    position: 'absolute',
    width: '50px',
    height: '50px',
    backgroundColor: type === 'user' ? 'blue' : 'green',
    left: `${position.x}px`,
    top: `${position.y}px`,
    zIndex: 10,
  };

  return (<div style={style}>{name}</div>);
};

export default Sprite;

