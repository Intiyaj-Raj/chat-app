import { LuSendHorizontal } from "react-icons/lu";

const Chat = () => {
  return (
    <div className="bg-white w-full max-w-2xl p-6 rounded-2xl shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">chat with AI</h2>
        <button className="text-sm font-semibold text-white py-1 px-2 bg-red-500 rounded-lg cursor-pointer">
          Logout
        </button>
      </div>
      {/* show messages */}
      <div className="h-96 overflow-y-auto space-y-3 border-1 border-gray-500 bg-gray-100 rounded-lg"></div>

      {/* write message */}
      <div className="flex gap-2 mt-4">
        <input
          type="text"
          name=""
          id=""
          placeholder="Type your message..."
          className="flex-1  border border-blue-700 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <button className="flex items-center gap-3 px-4 py-2 text-white cursor-pointer bg-indigo-500 hover:bg-indigo-700 rounded-lg">
          <LuSendHorizontal />
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
