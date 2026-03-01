import { useState, useRef, useEffect } from "react";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // fake bot reply
    setTimeout(() => {
      const botMessage = {
        sender: "bot",
        text: "Typing response...",
      };

      setMessages(prev => [...prev, botMessage]);
    }, 600);
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={msg.sender}>
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      <div className="input-area">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;