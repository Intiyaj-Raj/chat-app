import { useState } from "react";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleRegister() {
    console.log({
      email: email,
      password: password,
    });
  }
  return (
    <div className="bg-white p-6 rounded-2xl w-80 shadow-lg hover:shadow-2xl">
      <h2 className="text-center text-2xl font-bold text-purple-700">
        Create Account
      </h2>

      <input
        type="email"
        name=""
        id=""
        placeholder="Email"
        className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
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
        className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
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
      <p className="mt-3 text-center text-gray-600">Or Register with</p>
      <div className="flex justify-center space-x-4 mt-2">
        <FaGoogle className="text-red-500 text-2xl cursor-pointer hover:scale-110" />
        <FaFacebook className="text-blue-500 text-2xl cursor-pointer hover:scale-110" />
        <FaGithub className="text-gray-800 text-2xl cursor-pointer hover:scale-110" />
      </div>
      <p className="mt-4 text-center ">
        Already have an account?
        <span
          className="text-purple-600 cursor-pointer"
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
