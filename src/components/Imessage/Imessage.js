import React from "react";

import classes from "./Imessage.module.scss";
import Sidebar from "../Sidebar/Sidebar";
import ChatWindow from "../ChatWindow/ChatWindow";

function Imessage() {
  return (
    <div className={classes.imessage}>
      <Sidebar />
      <ChatWindow />
    </div>
  );
}

export default Imessage;
