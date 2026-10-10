import { useState } from "react";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleRegister() {
    if (email && password) {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);
      localStorage.setItem("isAuthenticated", "true");
      navigate("/chat");
    }
  }
  return (
    <div className="bg-gray-700 p-6 rounded-2xl w-80 shadow-lg hover:shadow-2xl">
      <h2 className="text-center text-2xl font-bold text-purple-700 mb-3">
        Create Account
      </h2>

      <input
        type="email"
        name=""
        id=""
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
        className="bg-purple-500 text-white w-full py-2 rounded hover:bg-purple-600 cursor-pointer"
        onClick={handleRegister}
      >
        Register
      </button>
      <p className="mt-3 text-center text-gray-400">Or Register with</p>
      <div className="flex justify-center space-x-4 mt-2">
        <FaGoogle className="text-red-500 text-2xl cursor-pointer hover:scale-110" />
        <FaFacebook className="text-blue-500 text-2xl cursor-pointer hover:scale-110" />
        <FaGithub className="text-gray-800 text-2xl cursor-pointer hover:scale-110" />
      </div>
      <p className="mt-4 text-center text-white">
        Already have an account?
        <span
          className="text-purple-600 cursor-pointer ms-1"
          onClick={() => {
            navigate("/");
          }}
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Register;
