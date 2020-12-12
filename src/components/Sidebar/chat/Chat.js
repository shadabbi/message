import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import * as timeago from "timeago.js";

import classes from "./Chat.module.scss";
import { setChat } from "../../../features/chatSlice";
import { useDispatch } from "react-redux";
import db from "../../../firebase/firebase";

function Chat({ data, id }) {
  const dispatch = useDispatch();
  const [chatInfo, setChatInfo] = useState([]);

  const setChatHandler = () => {
    dispatch(setChat({ chatId: id, chatName: data.chatName }));
  };

  useEffect(() => {
    db.collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setChatInfo(snapshot.docs.map((doc) => doc.data()));
      });
  }, [id]);
  return (
    <div className={classes.chat} onClick={setChatHandler}>
      <Avatar src={chatInfo[0]?.photo} />
      <div className={classes.info}>
        <h3>{data.chatName}</h3>
        <p>{chatInfo[0]?.message}</p>
        <small>
          {chatInfo[0]
            ? timeago.format(
                new Date(chatInfo[0]?.timestamp?.toDate()).toLocaleString()
              )
            : null}
        </small>
      </div>
    </div>
  );
}

export default Chat;
