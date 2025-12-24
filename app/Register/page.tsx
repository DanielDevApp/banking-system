"use client"
import { useRouter } from "next/navigation"
import { useState, type FormEvent } from "react" 
export default function Register(){
  const router = useRouter()
  const [username,setUsername]=useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")
  const [loading,setLoading] = useState(false)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || "Registration Failed")
        
      }
      localStorage.setItem("token", data.token)
      localStorage.setItem("uid", data.uid)
      localStorage.setItem("username", data.username)
      localStorage.setItem("balance", data.balance) 
      
      router.push("/Dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }     
    return(
<div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
  <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
    <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Register</div>
    <div className="relative mt-10 h-px bg-gray-300">
      <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
        <span className="bg-white px-4 text-xs text-gray-500 uppercase">Or Login With Gmail</span>
      </div>
    </div>
    <button className="relative mt-6 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200">
      <span className="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-blue-500"><i className="fab fa-facebook-f"></i></span>
      <span>Login with Gmail</span>
    </button> 



    <div className="mt-10">
      <form onSubmit={handleSubmit}>
         <div className="flex flex-col mb-6">
        
          
          <label htmlFor="username" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Username:</label>
          <div className="relative">
            <input type="text" id="username" value={username} onChange={(e)=>setUsername(e.target.value)}  name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Username" required/>
          </div>
        </div>

      
        <div className="flex flex-col mb-6">
          <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Gmail Address:</label>
          <div className="relative">
            <input id="email" value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Gmail" required/>
          </div>
        </div>
        <div className="flex flex-col mb-6">
          <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
          <div className="relative">
            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
              <span>
                <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
            </div>

            <input id="password" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="password" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Password" required/>
          </div>
        </div>
          {error && (<div className="mb-4 text-red-600 font-medium">{error}</div>)}
        <div className="flex w-full">
          <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
            <span className="mr-2 uppercase">{loading ? "Registering..." : "Register"}</span>
           
          </button>
        </div>
      </form>
      <div className="flex justify-center items-center mt-6">
          <a href="/Login" target="_blank" className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">
            
            <span className="ml-2">Already have an account? Login here</span>
          </a>
        </div>
    </div>
 
  </div>
</div>
    )
}