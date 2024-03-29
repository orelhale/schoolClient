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
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import DvrIcon from '@mui/icons-material/Dvr';
import EventNoteIcon from '@mui/icons-material/EventNote';


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


            <ListItem disablePadding>
            <ListItemButton onClick={()=>{navigate("professionList")}}>
                <ListItemIcon>
                    <BadgeOutlinedIcon color={"primary"} />
                </ListItemIcon>
            <ListItemText primary={"Profession list"}/>
            </ListItemButton>
            </ListItem>


            <ListItem disablePadding>
            <ListItemButton onClick={()=>{navigate("listEducationalPrograms")}}>
                <ListItemIcon>
                    <EventNoteIcon color={"primary"} />
                </ListItemIcon>
            <ListItemText primary={"List educational programs"}/>
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