import axios from "axios"
// const Url = "http://localhost:3066/"
const Url = "https://bmi-pbco.onrender.com/"
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
function calculatebmi(body) {
    return axios.post(Url + "user/calculatebmi", body, config)
}
function getUserHistory() {
    return axios.get(Url + "user/getUserHistory", config)
}
function clearhistory() {
    return axios.get(Url + "user/clearhistory", config)
}



export { registration, login, calculatebmi, getUserHistory, clearhistory }