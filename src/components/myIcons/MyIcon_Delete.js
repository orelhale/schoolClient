import { IconButton, TableCell } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';


// אייקון פח אשפה
let MyIcon_Delete = (props)=>{
    return(
        <IconButton sx={{height: "2rem", width: "2rem", padding: "0rem"}} onClick={props.onClick}>
            <DeleteIcon sx={{fontSize: "2rem"}} color="error" />
        </IconButton>
    )
}

export default MyIcon_Delete

{/* <TableCell sx={{display: "flex"}}>
<IconButton sx={{padding: "0rem"}} onClick={onClick}>
    <DeleteIcon sx={{fontSize: "2rem"}} color="error" />
</IconButton>
</TableCell> */}