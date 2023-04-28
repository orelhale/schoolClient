import { useEffect, useState } from "react";


function WaitForServer({ startWaitForServer = false }) {
   let [stop, setStop] = useState("");

   let [ponit, setPonit] = useState(".");

   useEffect(() => {
      clearInterval(stop);
      if (startWaitForServer) {
         setStop(
            setTimeout(() => {
               ponit == "..." ? setPonit(".") : setPonit(ponit + ".");
            }, 400)
         );
      }
      return () => {
         clearInterval(stop);
      };
   }, [ponit, startWaitForServer]);

   return (
      <div>
         {startWaitForServer && <h3>Waiting for a response from the server {ponit} </h3>}
      </div>
   )
}

export default WaitForServer;