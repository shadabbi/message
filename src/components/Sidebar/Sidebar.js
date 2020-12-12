import React, { useEffect, useState } from "react";

import classes from "./Sidebar.module.scss";
import { Avatar, IconButton } from "@material-ui/core";
import RateReviewIcon from "@material-ui/icons/RateReview";
import SearchIcon from "@material-ui/icons/Search";
import Chat from "./chat/Chat";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import db, { auth } from "../../firebase/firebase";
function Sidebar() {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    db.collection("chats").onSnapshot((spnapshot) => {
      setChats(
        spnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const addChatHandler = () => {
    const chatName = prompt("Enter a Chat name");
    if (!chatName) {
      return;
    }
    db.collection("chats").add({
      chatName,
    });
  };

  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebar__header}>
        <Avatar
          onClick={() => auth.signOut()}
          src={user.value.photo}
          className={classes.sidebar__avatar}
        />
        <div className={classes.sidebar__input}>
          <SearchIcon />
          <input placeholder="Search" />
        </div>
        <IconButton varient="outlined">
          <RateReviewIcon onClick={() => addChatHandler()} />
        </IconButton>
      </div>
      <div className={classes.sidebar__chats}>
        {chats.map(({ id, data }) => (
          <Chat key={id} id={id} data={data} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
