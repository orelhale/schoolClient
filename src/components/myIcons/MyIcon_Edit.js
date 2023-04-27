import { Avatar, IconButton, TableCell } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from "@mui/system";


// אייקון עפרון
let MyIcon_Edit = (props)=>{
    return(

        <Avatar sx={{height: "2rem", width: "2rem", backgroundColor: "#912eff",color:"#fff"}}>
            <EditIcon onClick={props.onClick}/>
        </Avatar>
    )
}

export default MyIcon_Edit

{/* <TableCell sx={{display: "flex"}}>
<Avatar sx={{height: "2.2rem", width: "2.2rem" , backgroundColor: "#912eff"}}>
    <EditIcon onClick={()=>{onClick}}/>
</Avatar>
</TableCell> */}