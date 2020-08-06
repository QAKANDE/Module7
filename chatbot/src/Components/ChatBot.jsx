import React, { Component, useState, useEffect } from "react";
import io from "socket.io-client";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
const connOpt = {
  transports: ["websocket"],
};
let socket = io("https://striveschool.herokuapp.com/", connOpt);
function ChatBot() {
  //   const [Count, setCount] = useState(0);
  //   useEffect(() => console.log("componentDidUpdate"), [Count]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [showModal, hideModal] = useState(true);
  React.useEffect(() => {
    console.log(messages);
    socket.on("bmsg", (msg) => setMessages((messages) => messages.concat(msg)));
  }, [socket]);
  const updateMessage = (e) => {
    setMessage(e.currentTarget.value);
  };
  const sendMessage = (e) => {
    e.preventDefault();
    if (message !== "") {
      socket.emit("bmsg", {
        user: username,
        message: message,
      });
      setMessage("");
    }
  };
  const handleClose = () => {
    hideModal(!Modal);
  };

  return (
    // <div onClick={() => setCount(Count + 1)}>You clicked {Count} times</div>
    <div>
      <div>
        <ul>
          {messages.map((message, i) => (
            <li key={i}>
              {message.user}
              {message.message}
            </li>
          ))}
        </ul>
        <form onSubmit={sendMessage}>
          <input value={message} onChange={(e) => updateMessage(e)} />
          <button>Send</button>
        </form>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set Your Username</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="my-2">
            <FormControl
              placeholder="Enter a Username"
              onChange={(e) => setUsername(e.currentTarget.value)}
            ></FormControl>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ChatBot;
