import axios from 'axios'
const BASE_URL ='http://localhost:5000/'
let TOKEN = null
if(localStorage.getItem('persist:root')){
    if( JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser === null)
        TOKEN = null
    else
        TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.accessToken
}

//console.log(JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user) )


// if( localStorage.getItem('persist:root')  !==  null)
//     TOKEN = null
// else
//     TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.accessToken


//console.log(JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.accessToken)

export const publicRequest = axios.create({
    baseURL: BASE_URL
})


export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token: `Bearer ${TOKEN}`}
})

