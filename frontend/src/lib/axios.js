import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(async (config) => {
    return config;

}, (err) => {
    return Promise.reject(err);
})


export default api;