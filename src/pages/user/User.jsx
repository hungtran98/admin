import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch} from 'react-redux'
import app from '../../firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'

import { updateUser} from '../../redux/apiCall'
import "./user.css";
import { useState } from "react";


export default function User() {
  const location = useLocation()
  const userId = location.pathname.split('/')[2]
  const user = useSelector(state => state.users.users.find(item => item._id === userId))
  const dispatch = useDispatch()
  const [inputs, setInputs] = useState({})
  const [file, setFile] = useState(null)

  const handleChange = (e) => {

    setInputs(prev => {
      return {
        ...prev, [e.target.name]: e.target.value
      }
    })
  }

  console.log(inputs)

  const handeUpdate = (e) => {
    e.preventDefault()
    //to do
    if(file !== null) {
      const fileName = new Date().getTime() + file.name
      const storage = getStorage(app)
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)
  
      uploadTask.on('state_changed', 
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
            }
          }, 
          (error) => {
            // Handle unsuccessful uploads
          }, 
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              //console.log('File available at', downloadURL);
              const user = {...inputs, img: downloadURL} 
              updateUser(dispatch, user, userId)
            })
    } )
    }
    else {
            updateUser(dispatch, inputs, userId)
    }
}
 
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={ user.img || "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+1 123 456 67</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">New York | USA</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  name='username'
                  onChange={handleChange}
                  type="text"
                  placeholder={user.username}
                  className="userUpdateInput"
                />
              </div>
              {/* <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Anna Becker"
                  className="userUpdateInput"
                />
              </div> */}
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  name='email'
                  onChange={handleChange}
                  type="text"
                  placeholder={user.email}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Role</label>
                <select name='isAdmin'>
                  <option value='true'>Admin</option>
                  <option value='false'>User</option>
                </select>
              </div>
              <div className="userUpdateItem">
                <label>Active</label>
                <select name='active'>
                  <option value='true'>Yes</option>
                  <option value='false'>No</option>
                </select>
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={user.img || "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" onChange={e => setFile(e.target.files[0])} style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton" onClick={handeUpdate}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
