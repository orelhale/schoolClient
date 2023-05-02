import axios from "axios";


export default async function apiFunction(path, type, data, callBack) {
   return await axios({
      method: type,
      url: `http://localhost:4000/${path}`,
      data: data
   })
   .then(data => {
      console.log("apiFunction data =",data.data);
      callBack && callBack(data)
      return data.data
   })
   .catch(err => console.log("Error in apiFunction === ", err.response.data))
}