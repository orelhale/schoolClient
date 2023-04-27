import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useNavigate } from 'react-router-dom';

import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';
import BallotRoundedIcon from '@mui/icons-material/BallotRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';


export default function ListButtonOfAdmin(){
	const navigate = useNavigate()
    
    return (
        <>
        <br></br>
            <ListItem disablePadding>
            <ListItemButton onClick={()=>{navigate("allUser")}}>
                <ListItemIcon>
                    <GroupsTwoToneIcon color={"primary"} />
                </ListItemIcon>
            <ListItemText primary={"All users"}/>
            </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
            <ListItemButton onClick={()=>{navigate("dataOfTheClasses")}}>
                <ListItemIcon>
                    <AssignmentOutlinedIcon color={"primary"} />
                </ListItemIcon>
            <ListItemText primary={"Data  of the classes"}/>
            </ListItemButton>
            </ListItem>
        <br></br>

            {/* <ListItem>
            <ListItemButton>
            <ListItemIcon>
                    
            </ListItemIcon>
            <ListItemText primary={""}/>
            </ListItemButton>
            </ListItem> */}
        </>
    )
}