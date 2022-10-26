import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings, ExitToApp } from "@material-ui/icons";
import { Button } from '@material-ui/core'

import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/apiCall'

export default function Topbar() {
  const user = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()

  const handleLogout = () => {
    logout(dispatch)
  }
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">hungShop</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Button onClick={handleLogout}>
              <ExitToApp />
            </Button>
          </div>
          <img src={user.img || "https://i.pinimg.com/564x/e5/0a/df/e50adff8f93b36e271069c23c23002f9.jpg"} alt="" className="topAvatar" />
         
        </div>
      </div>
    </div>
  );
}
