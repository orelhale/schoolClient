import AddIcon from '@mui/icons-material/Add';
import { IconButton } from "@mui/material"


let MyIcon_Add2 = ({ onClick }) => {
   return (
      <IconButton sx={{ height: "2rem", width: "2rem", padding: "0rem" }} onClick={onClick}>
         <AddIcon sx={{ fontSize: "2rem" }} color="primary" />
      </IconButton>
   )
}

export default MyIcon_Add2
