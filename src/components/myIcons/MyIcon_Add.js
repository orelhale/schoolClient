import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { IconButton } from "@mui/material"


let MyIcon_Add = ({ onClick, style = {}, color }) => {
   return (
      <IconButton sx={{ height: "2rem", width: "2rem", padding: "0rem", ...style }} onClick={onClick}>
         <ControlPointIcon sx={{ fontSize: "2rem" }} color={color || "primary"} />
      </IconButton>
   )
}

export default MyIcon_Add
