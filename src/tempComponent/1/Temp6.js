import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import RuleOutlinedIcon from '@mui/icons-material/RuleOutlined';

import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import But2 from './But2';



import { styled, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';


const drawerWidth = 240;

// ------------------------


// ------------------------

export default function Temp6() {
  // ------------------------



  // ------------------------

  return (


    <Box sx={{ display: 'flex' }}>
    <div>
        
        <AppBar  sx={{ width:"100%" }}>
            <Toolbar>
            <Typography variant="h6" noWrap component="div">
                Permanent drawer
            </Typography>
            </Toolbar>
        </AppBar>

    </div>
      
      <Box>
        <Toolbar />
        <Typography paragraph> 
        
       
        <div>xzxz</div>
        <div>xzxz</div>
        <div>xzxz</div>

        </Typography> 
			

        <div>
            {/* 111111111111 */}
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                    {/* 2222222222222 */}
                <Drawer
                sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
                }}
                variant="permanent"
                anchor="right"
            >
                        {/* החלק הכי עליון */}
                <Toolbar sx={{background: "#1976d2"}}>
                        <Box sx={{ display: { xs: 'none', md: 'flex', } }}>
                            <Box>
                                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={4} color="error">
                                    <MailIcon />
                                </Badge>
                                </IconButton>
                                <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                                >
                                <Badge badgeContent={17} color="error">
                                    <NotificationsIcon />
                                </Badge>
                                </IconButton>
                                <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-haspopup="true"
                                color="inherit"
                                >
                                <AccountCircle />
                                </IconButton>
                            </Box>
                        </Box>
                </Toolbar>
                
                
                    

                <Divider />
                
                <List>
                <But2 />
                {['list', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                        {text == "list" ? <RuleOutlinedIcon color='primary' /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                    </ListItem>
                ))}
                </List>

                <Divider />
                <List>
                {['log out'].map((text, index) => (
                    <ListItem key={text} disablePadding >
                    <ListItemButton>
                        <ListItemIcon>
                        <LogoutIcon color='primary'/>
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                    </ListItem>
                ))}
                </List>
            </Drawer>


      {/* 2222222222222 */}
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }} >

        <div style={{display: ""}}>
        <IconButton
            size="large"
            aria-label="show more"
            // aria-controls={mobileMenuId}
            aria-haspopup="true"
            // onClick={handleMobileMenuOpen}
            color="inherit"
            >
            <MoreIcon />
        </IconButton>
        </div>

        </Box>

      </div>			
      </Box>

    {/* 111111111 */}
    </Box>
  );
}
