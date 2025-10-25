import React from 'react'

function Samplepage() {
  return (
   <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-green">
      <h1 className="text-5xl font-bold mb-4 text-cyan-400">Tailwind Test ✅</h1>
      <p className="text-lg text-gray-300">
        If you see this styled text, Tailwind CSS is working!
      </p>
      <button className="mt-6 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition">
        Click Me
      </button>
    </div>
  )
}

export default Samplepage