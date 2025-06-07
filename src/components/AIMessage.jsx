import React from 'react';

const AIMessage = ({ text }) => {
  const parts = text.split('\n').map(line => line.trim()).filter(Boolean);

  return (
    <div className="flex justify-start mb-2">
      <div className="max-w-[70%] px-4 py-2 bg-gray-700 text-white rounded-xl text-left">
        {parts.map((line, index) => {
          const [heading, ...rest] = line.split(':');
          const content = rest.join(':').trim();

          if (!content) {
            return (
              <div key={index} className="text-gray-300 text-sm mb-1">
                {heading}
              </div>
            );
          }

          return (
            <div key={index} className="mb-1">
              <div className="font-bold text-sm text-white mb-0.5">{heading}:</div>
              <div className="font-light text-sm text-gray-200">{content}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AIMessage;
