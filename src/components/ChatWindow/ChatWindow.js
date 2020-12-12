import React, { useEffect, useState } from "react";
import MicIcon from "@material-ui/icons/Mic";
import IconButton from "@material-ui/core/IconButton";
import { useSelector } from "react-redux";
import firebase from "firebase";
import FlipMove from "react-flip-move";

import classes from "./ChatWindow.module.scss";
import { selectchatId, selectchatName } from "../../features/chatSlice";
import { selectUser } from "../../features/userSlice";
import Message from "./Message/Message";
import db from "../../firebase/firebase";

function ChatWindow() {
  const [input, setInput] = useState("");
  const chatName = useSelector(selectchatName);
  const user = useSelector(selectUser).value;
  const chatId = useSelector(selectchatId);

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (!chatId) {
      return;
    }
    const chatWin = document.querySelector(`.${classes.messages}`);
    if (chatWin) {
      const height = chatWin.scrollHeight;
      console.log(chatWin);
      chatWin.scrollBy(0, "655px");
    }

    db.collection("chats")
      .doc(chatId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, [chatId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("chats").doc(chatId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
    });
    setInput("");
  };

  const inputChangeHandler = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className={classes.chat}>
      <div className={classes.header}>
        <h4>
          To: <span>{chatName}</span>
        </h4>
        <strong>details</strong>
      </div>

      <div className={classes.messages}>
        <FlipMove>
          {messages.map((message) => (
            <Message key={message.id} content={message.data} />
          ))}
        </FlipMove>
      </div>

      <div className={classes.input}>
        <form>
          <input
            value={input}
            onChange={inputChangeHandler}
            placeholder="imassage"
            type="text"
          ></input>
          <button onClick={sendMessage}>send message</button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default ChatWindow;
