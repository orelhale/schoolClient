import axios from "axios";


export default async function apiFunction(path, type, data, callBackSuccess, callBackError) {
   return await axios({
      method: type,
      url: `http://localhost:4000/${path}`,
      data: data
   })
      .then(data => {
         let value = data.data;
         console.log("apiFunction data =", value);
         callBackSuccess && callBackSuccess(value)
         return value
      })
      .catch(err => {
         console.log("Error in apiFunction === ", err.response.data)
         callBackError && callBackError(err)
      })
}