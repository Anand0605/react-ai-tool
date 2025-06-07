import React from 'react';

const UserMessage = ({ text }) => {
  return (
    <div className="flex justify-end mb-2">
      <div className="max-w-[70%] px-4 py-2 bg-green-600 text-white rounded-xl text-left">
        <div className="text-base">{text}</div>
      </div>
    </div>
  );
};

export default UserMessage;
