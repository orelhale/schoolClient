import apiFunction from "./apiFunction";




function funcApi_GET2_Exams(dataToServer, callBackSuccess, callBackError) {
   apiFunction(`exams/${dataToServer.teacherId}/${dataToServer.className}`, "GET", dataToServer, callBackSuccess, callBackError)
}

function funcApi_DELETE_Exams(dataToServer, callBackSuccess, callBackError) {
   console.log("dataToServer = ",dataToServer);
   apiFunction("exams", "DELETE", dataToServer, callBackSuccess, callBackError)
}



export { funcApi_GET2_Exams, funcApi_DELETE_Exams }