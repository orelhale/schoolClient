import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { IconButton } from "@mui/material"


let MyIcon_Add = ({ onClick }) => {
   return (
      <IconButton sx={{ height: "2rem", width: "2rem", padding: "0rem" }} onClick={onClick}>
         <ControlPointIcon sx={{ fontSize: "2rem" }} color="primary" />
      </IconButton>
   )
}

export default MyIcon_Add
