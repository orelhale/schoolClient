import { Avatar, IconButton } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';


// אייקון עפרון
export default function MyIcon_Edit({ onClick, style = {}, color }) {
    return (

        // <Avatar sx={{ height: "2rem", width: "2rem", backgroundColor: "#912eff", color: "#fff" }}>
        //     <EditIcon onClick={onClick} />
        // </Avatar>
        <IconButton sx={{ height: "2rem", width: "2rem", ...style }} onClick={onClick && onClick} color={color}>
            <EditIcon />
        </IconButton>
    )
}
