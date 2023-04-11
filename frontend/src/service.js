import axios from "axios"
const Url = "http://localhost:3066/"
// const Url = "https://ecomservice.onrender.com/"
const token = JSON.parse(localStorage.getItem('token')) || ''
const config = {
    headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
    },
}


function registration(body) {
    return axios.post(Url + "signup", body, config)
}
function login(body) {
    return axios.post(Url + "login", body, config)
}



export { registration, login}