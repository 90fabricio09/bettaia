import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import useCreateChat from "../hooks/useCreateChat.jsx";
import { HashLoader } from "react-spinners";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { auth } from "../Firebase.jsx";
import botImage from "../assets/images/Betta_Design-light.png";

const CodeBlock = ({ language, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block-container">
      <button
        onClick={handleCopy}
        className={`copy-button ${copied ? "copied" : ""}`}
      >
        {copied ? (
          <>
            <i className="bi bi-check-circle" style={{ marginRight: "1px" }}></i>{" "}
            Copiado!
          </>
        ) : (
          <>
            <i className="bi bi-clipboard" style={{ marginRight: "1px" }}></i>{" "}
            Copiar
          </>
        )}
      </button>
      <SyntaxHighlighter
        language={language}
        style={docco}
        showLineNumbers
        wrapLongLines={true}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

const IA = () => {
  const [message, setMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 900);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const { sendMessage, messages, loading, clearChat } = useCreateChat();
  const botName = "Betta IA:";
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      sendMessage(message);
      setMessage("");
      adjustTextareaHeight();
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        300
      )}px`;
    }
  };

  useEffect(() => {
    const chatBox = document.querySelector(".chatbot-chat-box");
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [messages, loading]);

  const getMessageText = (msg) => {
    const text =
      typeof msg.parts[0].text === "string"
        ? msg.parts[0].text
        : JSON.stringify(msg.parts[0].text);

    if (text.includes("<code>") || text.includes("```")) {
      return `\`\`\`html\n${text.replace(/<\/?code>/g, "")}\n\`\`\``;
    }

    return text.replace(/\n/g, "  \n");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        return;
      } else {
        e.preventDefault();
        handleSendMessage();
      }
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <button
        className={`sidebar-toggle ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"
          }`}
        onClick={toggleSidebar}
      >
        <i className="bi bi-window-sidebar"></i>
      </button>
      {isSidebarOpen && (
        <div className="sidebar">
          <h2>Betta IA</h2>
          <ul>
            <li>
              <a href="/">
                <i className="bi bi-house-door"></i> Home
              </a>
            </li>
            <li>
              <button onClick={clearChat} className="new-chat">
                <i className="bi bi-plus-circle"></i> Novo Chat
              </button>
            </li>
            <li>
              <a href="https://bettaagency.com.br">
                <i className="bi bi-people"></i> Betta Agency
              </a>
            </li>
          </ul>
          <button className="logout-button" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right"></i> Sair
          </button>
        </div>
      )}

      {/* Chatbot Container */}
      <div className={`chatbot-container ${isSidebarOpen ? "" : "full-width"}`}>
        <div className="chatbot-chat-box">
          <ul className="chatbot-messages">
            {messages.map((msg, index) => {
              const isUser = msg.role === "user";
              const messageClass = isUser
                ? "chatbot-message chatbot-message-user"
                : "chatbot-message chatbot-message-bot";

              return (
                <li key={index} className={messageClass}>
                  {!isUser && (
                    <img
                      src={botImage}
                      alt={`${botName} avatar`}
                      className="chatbot-avatar"
                    />
                  )}
                  <div className="chatbot-message-content">
                    {!isUser && <strong>{botName}</strong>}
                    <Markdown
                      breaks={true}
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");
                          const codeValue = String(children).replace(/\n$/, "");
                          return !inline && match ? (
                            <CodeBlock language={match[1]} value={codeValue} />
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                        pre({ children, ...props }) {
                          const child = children[0];
                          if (
                            child &&
                            child.props &&
                            typeof child.props.children === "string"
                          ) {
                            const match = /language-(\w+)/.exec(child.props.className || "");
                            const codeValue = child.props.children.replace(/\n$/, "");
                            return match ? (
                              <CodeBlock language={match[1]} value={codeValue} />
                            ) : (
                              <pre {...props}>{children}</pre>
                            );
                          }
                          return <pre {...props}>{children}</pre>;
                        },
                      }}
                    >
                      {msg.parts[0].text}
                    </Markdown>
                  </div>
                </li>
              );
            })}
            {loading && (
              <li className="chatbot-loading">
                <HashLoader color="#0084ff" />
              </li>
            )}
            <div ref={messagesEndRef} />
          </ul>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="chatbot-input">
          <textarea
            value={message}
            ref={textareaRef}
            onChange={(e) => {
              setMessage(e.target.value);
              adjustTextareaHeight();
            }}
            placeholder="Digite sua mensagem"
            className="chatbot-textarea"
            rows="1"
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            onClick={handleSendMessage}
            className={`chatbot-submit ${message.trim() === "" ? "disabled" : ""
              }`}
            disabled={message.trim() === ""}
          >
            <i className="bi bi-send-fill"></i>
          </button>
        </form>
        <p className="warning-text">
          Betta IA pode cometer erros. Considere verificar informações
          importantes.
        </p>
      </div>
    </div>
  );
};

export default IA;