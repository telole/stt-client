import axios from "axios"

export const api = () => {
    return axios.create({
        baseURL: "http://localhost:1337/api/",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    })
}