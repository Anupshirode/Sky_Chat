/** @format */

import React, {  useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "./Firebase";
import { useAuth } from "../Contexts/AuthContext";
import axios from "axios";

const Chats = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };
  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }
    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": "832c6036-72d1-4e89-bd0d-b3201dfbc4e3",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formData = new FormData();
        formData.append("email", user.email);
        formData.append("username", user.email);
        formData.append("secret", user.uid);
        getFile(user.photoURL).then((avatar) => {
          formData.append("avatar", avatar, avatar.name);
          axios
            .post("https://api.chatengine.io/users/", formData, {
              headers: {
                "private-key": "9f08cd3d-ebb9-4983-8b56-62e0f4d453a5",
              },
            })
            .then(() => setLoading(false))
            .catch((error) => console.log(error));
        });
      });
  }, [user, history]);

  if (!user || loading) return "Loading...";
  return (
    <div className='chats-page'>
      <div className='nav-bar'>
        <div className='logo-tab'>Sky_Chat!</div>
        <div className='logout-tab' onClick={handleLogout}>
          Logout
        </div>
      </div>
      <ChatEngine
        height='calc(100vh - 66px)'
        projectID="832c6036-72d1-4e89-bd0d-b3201dfbc4e3"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
