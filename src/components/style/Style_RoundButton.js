import { Button } from "@mui/material"



let Style_RoundButton = (props)=>{
    let {bodyButton, onClick, styleB} = props
    return (
        <Button  variant="outlined" type='submit' onClick={onClick} sx={{borderRadius: "100%",padding: "0", height: "3rem", minWidth: "3rem", border: styleB == "r" && "1px red solid"}}> {bodyButton} </Button>
    )
}

export default Style_RoundButton

