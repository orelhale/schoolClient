import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material"


// אייקון פח אשפה
let MyIcon_Delete = ({ onClick , style={} , color}) => {
	return (
		<IconButton sx={{ height: "2rem", width: "2rem", padding: "0rem", ...style }} onClick={onClick}>
			<DeleteIcon sx={{ fontSize: "2rem" }} color={color || "error"} />
		</IconButton>
	)
}

export default MyIcon_Delete
