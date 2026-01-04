import React from 'react'
import { createBrowserRouter } from "react-router-dom";

const Login = () => {
  return (
    <div>
     <form className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="w-full max-w-sm bg-blue p-6 rounded-xl shadow-lg">
    <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
      Login
    </h1>

    <div className="space-y-4">
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Name"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Login
      </button>
    </div>
  </div>
</form>

    </div>
      
  )
}

export default Login