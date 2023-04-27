
import { Avatar, Box, ListItemIcon, Toolbar } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


let Style_Button_1 = (props)=>{

    let style = {
        // "min-width": "13rem",
        // border: "0.01rem black solid",
        borderRadius: "5rem",
        display: "inline-block", 
        // "background-color" : "rgb(206, 239, 206,0.5)",
        // "background-color" : "white",
        "background-color" : "rgba(253, 255, 252,1)",
        "box-shadow": "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
    }


    return (
        <>
            <Box sx={style} onClick={props.onClick}>
                <Toolbar sx={{"justify-content": "center"}}>
                    <span>{`${props.text}`}</span>
                </Toolbar>
            </Box>
        </>
    )
}

export default Style_Button_1
// ListItemIcon