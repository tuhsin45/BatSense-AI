import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { LuNotebookPen } from "react-icons/lu";
import { MdEmojiEmotions } from "react-icons/md";
import { FaGift } from "react-icons/fa6";
import { GiBatwingEmblem } from "react-icons/gi";
import { GoogleGenerativeAI } from "@google/generative-ai";

const App = () => {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setisResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loading, setLoading] = useState(false); 

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark-mode", !isDarkMode);
  };

  const hitRequest = () => {
    if (message) {
      generateResponse(message);
    }
  };

  const generateResponse = async (msg) => {
    if (!msg) return;

    setLoading(true); 
    const genAI = new GoogleGenerativeAI(
      "AIzaSyB7zOulR0hOvNsbuLMO4iUG1fx9igx9590"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(msg);

    const newMessages = [
      ...messages,
      { type: "userMsg", text: msg },
      { type: "responseMsg", text: result.response.text() },
    ];

    setMessages(newMessages);
    setisResponseScreen(true);
    setMessage("");
    setLoading(false);
    console.log(result.response.text());
  };

  const handleCardClick = (text) => {
    setMessage(text);  
    hitRequest();      
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      hitRequest();
    }
  };

  return (
    <>
      <div
        className={`container w-full min-h-screen flex flex-col justify-between ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}
      >
        {/* Header */}
        <div
          className="header fixed top-0 left-0 w-full flex justify-between items-center px-5 md:px-[300px] py-5 z-10"
          style={{
            background: isDarkMode ? "rgb(17, 24, 39)" : "rgb(243, 244, 246)", 
          }}
        >
          <h2 className="text-2xl">BatSense</h2>
          <button
            id="toggleThemeBtn"
            className={`p-[10px] rounded-[30px] cursor-pointer text-[14px] px-[20px] ${
              isDarkMode ? "bg-gray-100 text-black" : "bg-gray-900 text-white"
            }`}
            onClick={toggleTheme}
          >
            {isDarkMode ? "Bat Mode" : "Day Mode"}
          </button>
        </div>

        <div className="h-[80px]" />

        {/* Content */}
        <div className="flex-grow flex flex-col justify-center items-center">
          {loading ? (
            <div className="loader flex justify-center items-center text-lg">
              <span className="animate-spin mr-3 border-4 border-t-transparent rounded-full w-8 h-8 border-gray-500"></span>
              Generating response...
            </div>
          ) : isResponseScreen ? (
            <div className="messages flex flex-col items-center">
              {messages?.map((msg, index) => (
                <div
                  key={index}
                  className={`p-4 m-2 rounded-md max-w-[80%] ${
                    msg.type === "userMsg"
                      ? isDarkMode
                        ? "bg-gray-800 text-white"
                        : "bg-gray-200 text-black"
                      : isDarkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-black"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
          ) : (
            <div className="middle grid grid-cols-2 md:grid-cols-4 gap-4 justify-center">
              <div
                className={`card rounded-lg cursor-pointer transition-all hover:bg-gray-400 px-[8px] py-[16px] ${
                  isDarkMode
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200 text-black"
                } flex flex-col justify-between items-center`}
                onClick={() =>
                  handleCardClick("How to secure a good CGPA?")
                }
              >
                <p className="text-[14px] text-center">
                  How to secure <br /> a good CGPA?
                </p>
                <i className="text-[16px] mt-4">
                  <LuNotebookPen />
                </i>
              </div>
              <div
                className={`card rounded-lg cursor-pointer transition-all hover:bg-gray-400 px-[8px] py-[16px] ${
                  isDarkMode
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200 text-black"
                } flex flex-col justify-between items-center`}
                onClick={() =>
                  handleCardClick("How to cheer up a friend who's angry at me?")
                }
              >
                <p className="text-[14px] text-center">
                  How to cheer up a friend <br /> who's angry at me?
                </p>
                <i className="text-[16px] mt-4">
                  <MdEmojiEmotions />
                </i>
              </div>
              <div
                className={`card rounded-lg cursor-pointer transition-all hover:bg-gray-400 px-[8px] py-[16px] ${
                  isDarkMode
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200 text-black"
                } flex flex-col justify-between items-center`}
                onClick={() =>
                  handleCardClick("What's the best gift for a birthday?")
                }
              >
                <p className="text-[14px] text-center">
                  What's the best gift <br /> for a birthday?
                </p>
                <i className="text-[16px] mt-4">
                  <FaGift />
                </i>
              </div>
              <div
                className={`card rounded-lg cursor-pointer transition-all hover:bg-gray-400 px-[8px] py-[16px] ${
                  isDarkMode
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200 text-black"
                } flex flex-col justify-between items-center`}
                onClick={() =>
                  handleCardClick("What's the secret to being Batman?")
                }
              >
                <p className="text-[14px] text-center">
                  What's the secret to <br /> being Batman?
                </p>
                <i className="text-[16px] mt-4">
                  <GiBatwingEmblem />
                </i>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bottom w-full flex flex-col items-center py-4">
          <div
            className={`inputBox w-11/12 md:w-[60%] text-[15px] py-[7px] flex items-center ${
              isDarkMode ? "bg-gray-800" : "bg-gray-200"
            } rounded-[30px]`}
          >
            <input
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              onKeyDown={handleKeyPress}
              type="text"
              className="p-[10px] pl-[15px] bg-transparent flex-1 outline-none border-none"
              placeholder="Write your message here..."
              id="messageBox"
            />
            {message !== "" && (
              <i
                className={`text-[20px] mr-5 cursor-pointer ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
                onClick={hitRequest}
              >
                <IoSend />
              </i>
            )}
          </div>
          <p className="text-[gray] text-[12px] mt-2 text-center">
            BatSense is developed by tuhsin45. This AI uses the Gemini
            API for responses.
          </p>
        </div>
      </div>
    </>
  );
};

export default App;
