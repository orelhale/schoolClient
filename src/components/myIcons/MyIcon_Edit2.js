
import { IconButton } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import { Box } from "@mui/system";


// אייקון עפרון
let MyIcon_Edit2 = ({ onClick }) => {
    return (
        <IconButton sx={{ height: "2rem", width: "2rem", padding: "0rem" }} onClick={onClick}>
            <EditIcon sx={{ fontSize: "2rem" }} color="warning" />
        </IconButton>
    )
}

export default MyIcon_Edit2
