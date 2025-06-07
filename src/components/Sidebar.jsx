import React from 'react';

function Sidebar({ chatHistory, onToggle, onClearHistory, onDeleteHistoryItem }) {
  return (
    <div className=" flex flex-col justify-between p-4 h-screen hide-scrollbar">
      {/* Top bar with logo and close icon */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-white text-xl font-bold">Nexa</div>
        <button
          onClick={onToggle}
          className="text-white border px-2 py-1 rounded hover:bg-zinc-700"
          aria-label="Close Sidebar"
        >
          ✖️
        </button>
      </div>

      {/* Chat history list with vertical scrollbar */}
      <div
        className="flex-1 overflow-y-auto space-y-2"
        style={{ maxHeight: 'calc(100vh - 120px)' }}
      >
        {chatHistory
          .map((item, originalIndex) => ({ item, originalIndex })) // original index preserve
          .filter(({ item }) => item.type === 'user')
          .map(({ item, originalIndex }) => (
            <div
              key={originalIndex}
              className="bg-zinc-700 text-white text-sm px-3 py-2 rounded flex justify-between items-center cursor-pointer hover:bg-zinc-600"
              title={item.text}
            >
              <span className="truncate max-w-[80%]">
                {item.text.length > 50 ? item.text.slice(0, 50) + '...' : item.text}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent parent click
                  onDeleteHistoryItem(originalIndex);
                }}
                className="text-red-400 hover:text-red-600 ml-2"
                title="Delete this item"
              >
                ✖️
              </button>
            </div>
          ))}
      </div>

      {/* Clear history button */}
      <div className="mt-4">
        <button
          onClick={onClearHistory}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Clear History
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
