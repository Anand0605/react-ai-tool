import { useState, useRef, useEffect } from 'react';
import './App.css';
import { url } from './constants';
import AIMessage from './components/AIMessage';
import UserMessage from './components/UserMessage';
import Sidebar from './components/Sidebar';

function App() {
  const [Question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const askQuestion = async () => {
    if (!Question.trim()) return;

    setChatHistory(prev => [...prev, { type: 'user', text: Question }]);
    setQuestion('');
    setLoading(true);

    const payload = {
      contents: [
        {
          parts: [
            {
              text: Question,
            },
          ],
        },
      ],
    };

    try {
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      response = await response.json();

      let text = response?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        console.error('No text found in response');
        setLoading(false);
        return;
      }

      text = text
        .split('\n')
        .map(line => line.replace(/^\d+\.\s*/, '').trim())
        .join('\n');

      setChatHistory(prev => [...prev, { type: 'ai', text }]);
      setLoading(false);
    } catch (error) {
      console.error('Error in askQuestion:', error);
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      askQuestion();
    }
  };

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const clearHistory = () => {
    // ⚠️ Ye sirf Sidebar ke liye clear karna ho to,
    // ek alag sidebarHistory banana padta hai
    // Filhal is function me poora chatHistory clear hoga:
    setChatHistory([]);
  };

 return (
    <>
      {/* Background video */}
     <video
  autoPlay
  loop
  muted
  playsInline
  className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
>
  <source src="/ai-ai.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>



      {/* Overlay container for all chat UI */}
      <div className="relative z-10  bg-opacity-40 min-h-screen">
        <div className="grid grid-cols-5 h-screen text-center relative">
          {/* Sidebar */}
          {sidebarOpen && (
            <div className="col-span-1 bg-transparent">
              <Sidebar
                chatHistory={chatHistory}
                onToggle={toggleSidebar}
                onClearHistory={clearHistory}
              />
            </div>
          )}

          {/* Sidebar Open button */}
          {!sidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="absolute top-4 left-4 bg-zinc-700 bg-opacity-60 text-white px-2 py-1 rounded hover:bg-zinc-600 z-20"
            >
              ☰
            </button>
          )}

          {/* Main Chat Area */}
          <div
            className={`p-6 flex flex-col justify-end transition-all duration-300 ${
              sidebarOpen ? 'col-span-4' : 'col-span-5'
            } bg-transparent`}
          >
            <div
              ref={chatContainerRef}
              className="w-full flex flex-col space-y-4 overflow-auto mb-4 px-4 max-h-[calc(100vh-100px)] hide-scrollbar"
            >
              {chatHistory.map((item, index) => {
                if (item.type === 'user') {
                  return <UserMessage key={index} text={item.text} />;
                } else {
                  return <AIMessage key={index} text={item.text} />;
                }
              })}

              {loading && (
                <div className="flex justify-start mb-2">
                  <div className="px-4 py-2 bg-gray-700 bg-opacity-70 text-white rounded-xl text-left animate-pulse">
                    <div className="text-sm font-light">Typing...</div>
                  </div>
                </div>
              )}
            </div>

            {/* Input box */}
            <div className="bg-zinc-800 bg-opacity-80 w-1/2 p-1 pr-5 text-white mx-auto mb-0 rounded-4xl border border-zinc-700 flex h-12">
              <input
                type="text"
                className="w-full h-full p-3 outline-none bg-transparent"
                placeholder="Ask me anything..."
                onChange={(e) => setQuestion(e.target.value)}
                value={Question}
                onKeyDown={handleKeyDown}
              />
              <button onClick={askQuestion} className="px-4">
                Ask
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
