import React, { useEffect, useRef, useState } from "react";
import "./StudentRoom.css"; // Removed: CSS will be inlined below
// import { BookOpen, FileText, Monitor, Video } from "lucide-react"; // No longer needed
// import { Navbar } from "../../nav/Navbar"; // No longer needed
import { useParams } from "react-router-dom";
import { askRoomQuestion } from "../../api/apis"; // Removed: Mocking API call



export default function StudentRoom() {
  const { id: roomId } = useParams();

  const [messages, setMessages] = useState([
    { text: "Hi! I'm your chatbot 🤖 How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const [sending, setSending] = useState(false);

  // PDF fetching logic is removed as the iframe is gone.

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // show typing indicator
    setSending(true);
    setMessages((prev) => [...prev, { text: "Typing...", sender: "bot" }]);

    try {
      // Using the mock function
      const res = await askRoomQuestion(roomId, newMessage.text);
      // remove typing indicator and add real response
      setMessages((prev) => {
        const withoutTyping = prev.filter((m) => m.text !== "Typing..." || m.sender !== "bot");
        return [...withoutTyping, { text: res?.message ?? "No response", sender: "bot" }];
      });
    } catch (err) {
      setMessages((prev) => {
        const withoutTyping = prev.filter((m) => m.text !== "Typing..." || m.sender !== "bot");
        return [...withoutTyping, { text: "Sorry, I couldn't process that.", sender: "bot" }];
      });
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>

      <div className="room-page">
        {/* Chatbot Section */}
        <aside className="room-chatbot">
          <h3>Study Bot</h3>
          <div className="room-chat-window">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-message ${msg.sender === "bot" ? "bot" : "user"}`}
              >
                {msg.text}
              </div>
            ))}
            {/* This div is used to scroll to the bottom */}
            <div ref={chatEndRef} />
          </div>
          <div className="room-chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !sending && handleSend()}
              placeholder="Type your question..."
              disabled={sending}
            />
            <button onClick={handleSend} disabled={sending}>
              {sending ? "..." : "Send"}
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}

// ResourceCard function is no longer needed
// function ResourceCard({ icon, title }) { ... }

