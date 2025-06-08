import React from 'react';

function Sidebar({ chatHistory, onToggle, onClearHistory, onDeleteHistoryItem }) {
  return (
    <div className="flex flex-col justify-between p-4 h-screen hide-scrollbar">
      {/* Top bar */}
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

      {/* History List */}
      <div
        className="flex-1 overflow-y-auto space-y-1 hide-scrollbar"
        style={{ maxHeight: 'calc(100vh - 120px)' }}
      >
        {chatHistory.map((item, index) => (
          <div key={index} className="group flex items-center justify-between">
            <button
              title={item.text}
              className="w-full text-left text-sm text-white truncate px-3 py-1 rounded hover:bg-zinc-700 border border-zinc-600"
            >
              {item.text.length > 50 ? item.text.slice(0, 50) + '...' : item.text}
            </button>
            <button
  onClick={(e) => {
    e.stopPropagation();
    onDeleteHistoryItem(index);
  }}
  className="ml-2 text-red-500 hover:text-red-700 text-sm"
  title="Delete this item"
>
  ❌
</button>
          </div>
        ))}
      </div>

      {/* Clear History Button */}
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
