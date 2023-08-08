import React from 'react'
import Timer from "./timer";
import { useRouter } from "next/router";

function homepage() {
    const router = useRouter()
    function handleSignOut() {
        router.push("/login");
      }
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">User Homepage</h3>
      <div className="details">
        <h5>Welcome to Homepage</h5>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSignOut}
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 bg-gray-50"
        >
          Sign Out
        </button>
      </div>
        <Timer onLogout={handleSignOut} />
         
      <div className="flex justify-center">
      </div>
      </main>
  )
}

export default homepage