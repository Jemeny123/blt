import axios from "axios";

let request = axios.create({
  baseURL: "/",
  timeout: 3000,
  //header:{"Authorization":'token'}工作需要token，header是在工作需要的，有了这个才能访问后端，token是要向后端拿的
});
export default request;
