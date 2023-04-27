import axios from 'axios';
import { Await } from 'react-router-dom';



function checkToken(level_permission){
    return new Promise((resolve, reject) => {

        try{
            let token = localStorage.tokenOfUser
            if(!token){  
                throw "$$ err: not token "
            }
            token = JSON.parse(token)
            // else{
                axios.get("http://localhost:4000/system/checkToken",{headers: {token: token}})
                    .then((data)=>{
                        if(data.data.level_permission == level_permission){
                            resolve(data.data)
                        }
                        resolve(false)
                    },(err)=>{
                        resolve(false)
                    })
                ;
                
            // }

        }catch(err){
            console.log(err);
            resolve(false)
        }
    });
}




export { checkToken }