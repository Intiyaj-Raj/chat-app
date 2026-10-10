import { useEffect, useRef, useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { FaImage, FaRobot, FaRegUserCircle } from "react-icons/fa";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});
const Chat = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const chatRef = useRef(null);

  // set authentication ---- users must be logged in before they can access the chat.
  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (!auth) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [message]);

  function handleLogOut() {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  }

  async function handleSend() {
    const text = input.trim();

    if ((!text && !selectedImage) || loading) return;

    const imageToSend = selectedImage;

    const newMessages = [];

    if (text) {
      newMessages.push({ from: "user", text });
    }

    if (imageToSend) {
      newMessages.push({
        from: "user",
        type: "image",
        imageUrl: imageToSend,
      });
    }

    setMessage((prev) => [...prev, ...newMessages]);
    setInput("");
    setSelectedImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (!text) {
      setMessage((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Please add a text message so I can reply.",
        },
      ]);
      return;
    }

    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: text,
      });

      setMessage((prev) => [
        ...prev,
        {
          from: "bot",
          text: response.text || "No reply received.",
        },
      ]);
    } catch (error) {
      console.error("AI error:", error);

      setMessage((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Sorry, I couldn't generate a reply. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleImageUpload(e) {
    const file = e.target.files?.[0];

    if (!file || !file.type.startsWith("image/")) {
      return;
    }

    setSelectedImage(URL.createObjectURL(file));
  }
  return (
    <div className="bg-gray-700 w-full max-w-2xl p-6 rounded-2xl shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Chat with AI</h2>
        <button
          className="text-sm font-semibold text-white py-2 px-3 bg-red-500 rounded-lg cursor-pointer"
          onClick={handleLogOut}
        >
          Logout
        </button>
      </div>
      {/* show messages */}
      <div
        ref={chatRef}
        className="h-96 overflow-y-auto space-y-3 border border-gray-700 bg-gray-800 rounded-lg scrollbar-none p-2"
      >
        {message.map((msg, index) => (
          <div
            className={`flex px-2 m-0 p-0 text-white items-start space-x-2 ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            key={index}
          >
            {msg.from === "bot" && <FaRobot className="text-xl text-red-500" />}
            <div
              className={`flex gap-1 px-3 py-2 rounded-xl text-sm max-w-xs ${msg.from === "user" ? "bg-indigo-500 text-white" : "bg-gray-600 text-white"}`}
            >
              {msg.type === "image" ? (
                <img
                  src={msg.imageUrl}
                  alt="Uploaded user content"
                  className="w-48 h-24 object-cover rounded-lg border border-white/50"
                />
              ) : (
                msg.text
              )}
            </div>
            {msg.from === "user" && (
              <FaRegUserCircle className="text-xl text-yellow-500" />
            )}
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="mt-3 flex items-center gap-3 rounded-lg border border-dashed border-black bg-indigo-100 p-2">
          <img
            src={selectedImage}
            alt="selected image"
            className="w-16 h-16 object-cover rounded-lg"
          />
          <span className="text-sm text-indigo-700">Photo ready to send</span>
          <button
            type="button"
            onClick={() => {
              setSelectedImage(null);
            }}
            className="ml-auto text-xs text-red-600 font-semibold bg-gray-400 p-2 rounded-lg"
          >
            Remove
          </button>
        </div>
      )}

      {/* write message */}
      <div className="flex mt-4 gap-2 items-center">
        <label className="flex items-center justify-center cursor-pointer bg-gray-300 text-gray-700 px-2 py-2 rounded-lg hover:bg-gray-400">
          <FaImage className="m-1" />
          <input
            type="file"
            name=""
            id=""
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
        </label>
        <input
          type="text"
          name=""
          id=""
          placeholder="Type your message..."
          className="text-white flex-1 border rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />
        <button
          disabled={loading}
          onClick={handleSend}
          className="flex items-center gap-3 px-4 py-2
  text-white bg-indigo-500 rounded-lg
  disabled:opacity-50"
        >
          <LuSendHorizontal />
        </button>
      </div>
    </div>
  );
};

export default Chat;
