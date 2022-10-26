import { useState } from "react"
import { useDispatch } from 'react-redux'
import { login } from "../../redux/apiCall"
import "./login.css"




const Login = () => {
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const dispatch = useDispatch()
//console.log(user, password)

const handleClick = (e) => {
    e.preventDefault()
    login(dispatch, {
        username,
        password
    })

    
}

    return (
        <div className="container_login">
            <div className="login_form">
                <input className="login-input" type="text" placeholder="username" onChange={e => setUsername(e.target.value)}/>
                <input className="login-input" type="password" placeholder="password" onChange={e => setPassword(e.target.value)}/>
                <button className="login_btn" onClick={handleClick}>Login</button>
            </div>
        </div>
 
    )
}

export default  Login