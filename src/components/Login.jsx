import { useState } from "react";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    const storedEamil = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");
    if (email === storedEamil && password === storedPassword) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/chat");
    } else {
      setError("Invalid email or password");
    }
  }
  return (
    <div className="bg-gray-700 p-6 rounded-2xl shadow-lg w-80 hover:shadow-2xl">
      <h2 className="text-white text-2xl font-bold text-center mb-4">
        Login Page
      </h2>
      {error && (
        <p className="text-red-500 text-center mb-2 text-sm"> {error}</p>
      )}
      <input
        type="email"
        placeholder="Email"
        className="w-full mb-3 shadow-sm p-2 border border-gray-400 text-white rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="text"
        name=""
        id=""
        placeholder="Password"
        className="w-full mb-3 shadow-sm p-2 border border-gray-400 text-white rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        className="bg-indigo-500 text-white w-full py-2 rounded hover:bg-indigo-600 cursor-pointer outline-none focus:ring-2 focus:ring-indigo-500"
        onClick={handleLogin}
      >
        Login
      </button>
      <p className="mt-3 text-center text-gray-400">Or login with</p>
      <div className="flex justify-center space-x-4 mt-2">
        <FaGoogle className="text-red-500 text-2xl cursor-pointer hover:scale-110" />
        <FaFacebook className="text-blue-500 text-2xl cursor-pointer hover:scale-110" />
        <FaGithub className="text-gray-800 text-2xl cursor-pointer hover:scale-110" />
      </div>
      <p className="mt-4 text-center text-white">
        Don't have an account?
        <span
          className="text-blue-400 cursor-pointer ms-1"
          onClick={() => {
            navigate("/register");
          }}
        >
          Register
        </span>
      </p>
    </div>
  );
};

export default Login;
