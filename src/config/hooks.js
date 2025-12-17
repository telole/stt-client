import axios from "axios"

const getBaseURL = () => {
    return process.env.REACT_APP_API_BASE_URL || 'http://localhost:1337/api/'
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

// Helper untuk mendapatkan base URL untuk gambar (tanpa /api)
export const getImageBaseURL = () => {
    const baseURL = getBaseURL()
    // Hapus /api/ dari akhir URL jika ada
    return baseURL.replace(/\/api\/?$/, '')
}