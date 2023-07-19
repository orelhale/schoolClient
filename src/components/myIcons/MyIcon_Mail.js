import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { IconButton } from "@mui/material"


export default function MyIcon_Mail({ onClick }) {
   return (
      <IconButton sx={{ height: "2rem", width: "2rem", padding: "0rem" }} onClick={onClick}>
         <MailOutlineIcon sx={{ fontSize: "1.8rem" }} color="primary" />
      </IconButton>
   )
}


