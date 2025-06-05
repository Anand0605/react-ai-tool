import { useState } from 'react'
import './App.css'
import { url } from './constants'
import Answer from './components/Answers'

function App() {

  const [Question, setQuestion] = useState("")
  const [result, setResult] = useState(undefined)

  const payload = {
    "contents": [
      {
        "parts": [
          {
            "text": Question
          }
        ]
      }
    ]
  }

  const askQuestion = async () => {

    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload)
    })

    response = await response.json()

    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("*");
    dataString = dataString.map((item) => item.trim())

    console.log(dataString)
    setResult(response.candidates[0].content.parts[0].text)

  }

  return (
    <>
      <div className="grid grid-cols-5 h-screen text-center">
        <div className="col-span-1 bg-zinc-800"></div>

        <div className="col-span-4 p-6">
          {/* Ensure parent container fills height and pushes input down */}
          <div className="h-full flex flex-col justify-end">
            <div className='container h-110 overflow-scroll'>
              <div className='text-white'>
                {result}
                {
                  result && result.map((item, index) => (
                    <li className='text-left p-1'><Answer ans={item} key={index} /></li>
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
  )
}

export default App
