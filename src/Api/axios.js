import axios from 'axios';

const axiosInstance = axios.create({
    //baseURL: "http://127.0.0.1:5001/e-clone-df53f/us-central1/api"
   baseURL: "https://amazon-backend-api-deploy-ur8b.onrender.com"
});

export { axiosInstance };