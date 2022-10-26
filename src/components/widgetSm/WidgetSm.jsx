import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { userRequest } from "../../api";

export default function WidgetSm() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get('/users/?new=true')
        setUsers(res.data)
      } catch (error) {
      }
    }
    getUsers()
  },[])
  console.log(users)
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {
          users.map(user => (
            <li className="widgetSmListItem" key={user._id}>
            <img
              src={user.img || 'https://i.pinimg.com/564x/ba/58/83/ba5883c68a1ffef7d29971eaa7686133.jpg'}
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
              {/* <span className="widgetSmUserTitle">Software Engineer</span> */}
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
          ))
           
          
        }
        
      </ul>
    </div>
  );
}
