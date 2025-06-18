import React from 'react';
import Confetti from 'react-confetti';

const ConfettiEffect = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={500}
        gravity={0.1}
      />
    </div>
  );
};

export default ConfettiEffect;