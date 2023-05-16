import axios from "axios";

const request=axios.create({
    baseURL:"https://mobile-app-lj29.onrender.com/"
})

export default request;