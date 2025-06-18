import React from 'react';

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-4">
      <p className="text-red-700 dark:text-red-300">{message}</p>
    </div>
  );
};

export default ErrorMessage;