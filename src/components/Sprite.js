import React from 'react';

const Sprite = ({ type, startPosition }) => {
  const style = {
    position: 'absolute',
    width: '50px',
    height: '50px',
    backgroundColor: type === 'user' ? 'blue' : 'green',
    left: startPosition.x,
    top: startPosition.y === 'bottom' ? 'calc(100% - 50px)' : startPosition.y,
  };

  return <div style={style} />;
};

export default Sprite;
