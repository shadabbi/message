import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./App.css";
import Imessage from "./components/Imessage/Imessage";
import { selectUser, login, logout } from "./features/userSlice";
import Login from "./components/Login/Login";
import { auth } from "./firebase/firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          login({
            uid: user.uid,
            photo: user.photoURL,
            email: user.email,
            displayName: user.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return <div className="app">{user.value ? <Imessage /> : <Login />}</div>;
}

export default App;
