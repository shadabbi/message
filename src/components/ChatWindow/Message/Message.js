import { Avatar } from "@material-ui/core";
import React, { forwardRef } from "react";

import classes from "./Message.module.scss";
import { selectUser } from "../../../features/userSlice";
import { useSelector } from "react-redux";

const Message = forwardRef(({ id, content }, ref) => {
  const user = useSelector(selectUser).value;
  return (
    <div
      ref={ref}
      className={
        user.email === content.email
          ? [classes.currentUser, classes.message].join(" ")
          : classes.message
      }
    >
      <Avatar className={classes.photo} src={content.photo} />
      <p>{content.message}</p>
      <small>{new Date(content.timestamp?.toDate()).toLocaleString()}</small>
    </div>
  );
});

export default Message;
