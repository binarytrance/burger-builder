import axios from "axios";

const instance = axios.create({
    baseURL: `https://my-burger-builder-42007.firebaseio.com/`
});
export default instance;
