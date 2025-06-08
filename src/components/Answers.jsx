import React, { useEffect } from 'react';

const Answers = ({ ans, isAI }) => {
  useEffect(() => {
    console.log(ans);
  }, [ans]);

  // Split answer into lines — so multiline handle ho
  const parts = ans.split('\n').map(line => line.trim()).filter(Boolean);

  return (
    <div className={`flex ${isAI ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`max-w-[70%] px-4 py-2 ${isAI ? 'bg-blue-600 text-white' : ' text-white'} rounded-xl`}>
        {parts.map((line, index) => {
          const [heading, ...rest] = line.split(':');
          const content = rest.join(':').trim();

          // If no colon, show whole line as content
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

export default Answers;
