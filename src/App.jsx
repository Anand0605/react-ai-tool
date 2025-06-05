import { useState } from 'react';
import './App.css';
import { url } from './constants';
import Answer from './components/Answers';

function App() {
  const [Question, setQuestion] = useState('');
  const [result, setResult] = useState([]); // store as array, not undefined

  const askQuestion = async () => {
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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      response = await response.json();

      const text = response?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        console.error('No text found in response');
        return;
      }

      // Split and clean the data
      const dataArray = text.split('*').map((item) => item.trim()).filter(Boolean);

      console.log(dataArray); // optional
      setResult(dataArray);   // set array of answers to state
    } catch (error) {
      console.error('Error in askQuestion:', error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-5 h-screen text-center">
        <div className="col-span-1 bg-zinc-800"></div>

        <div className="col-span-4 p-6">
          <div className="h-full flex flex-col justify-end">
            <div className="container h-110 overflow-scroll">
              <div className="text-white text-left space-y-2">
                {
                  result.length > 0 && result.map((item, index) => (
                    <li key={index} className="p-1 list-disc">
                      <Answer ans={item} />
                    </li>
                  ))
                }
              </div>
            </div>

            <div className="bg-zinc-800 w-1/2 p-1 pr-5 text-white mx-auto mb-0 rounded-4xl border border-zinc-700 flex h-12">
              <input
                type="text"
                className="w-full h-full p-3 outline-none bg-transparent"
                placeholder="Ask me anything..."
                onChange={(e) => setQuestion(e.target.value)}
                value={Question}
              />
              <button onClick={askQuestion} className="px-4">Ask</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
