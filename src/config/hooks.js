import axios from "axios"

const getBaseURL = () => {
<<<<<<< HEAD
    return process.env.REACT_APP_API_BASE_URL
=======
    return process.env.REACT_APP_API_BASE_URL || 'http://localhost:1337/api/'
>>>>>>> 4ca63424dd72f1e3cf3d75026baa04fc8b957f12
}

export const api = () => {
    return axios.create({
        baseURL: getBaseURL(),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    })
}

export const getImageBaseURL = () => {
    const baseURL = getBaseURL()
    return baseURL.replace(/\/api\/?$/, '')
}