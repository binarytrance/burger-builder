import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://my-burger-builder-42007.firebaseio.com/`
});
export default axiosInstance;
