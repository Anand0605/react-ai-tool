import { useState } from 'react'
import './App.css'

function App() {

  const [Question, setQuestion] = useState("")

  const askQuestion =()=>{
    console.log(Question)
  }

  return (
    <>
      <div className="grid grid-cols-5 h-screen text-center">
        <div className="col-span-1 bg-zinc-800"></div>

        <div className="col-span-4 p-6">
          {/* Ensure parent container fills height and pushes input down */}
          <div className="h-full flex flex-col justify-end">
            <div className="bg-zinc-800 w-1/2 p-1 pr-5 text-white mx-auto mb-0 rounded-4xl border border-zinc-700 flex h-12">
              <input
                type="text"
                className="w-full h-full p-3 outline-none bg-transparent"
                placeholder="Ask me anything..."
                onChange={(e)=>setQuestion(e.target.value)}
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
