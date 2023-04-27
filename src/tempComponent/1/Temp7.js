import * as React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import But2 from './But2';
import LogoutIcon from '@mui/icons-material/Logout';
import RuleOutlinedIcon from '@mui/icons-material/RuleOutlined';

import Avatar from '@mui/material/Avatar';

import PersonIcon from '@mui/icons-material/Person';

import ListAltIcon from '@mui/icons-material/ListAlt';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import PostAddIcon from '@mui/icons-material/PostAdd';
import OpenList1 from './OpenList1';


function Temp7(props) {
	const drawerWidth = 240;

	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [checkOpenListExams, setCheckOpenListExams] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const openListOfExams = () => {
		setCheckOpenListExams(checkOpenListExams ? false: true)
		console.log("openListOfExams");
	};



// 00000 משתנה שמחיק את התוכן של 2 המגרות
  const drawer = (
    <div>
        {/* החלק הכי עליון של המגרה */}
		<Toolbar>
			<Avatar>
				<PersonIcon />
			</Avatar>
			{props.nameUser}
		</Toolbar>
        

		<Divider />
      	<List sx={{mb:drawerWidth /14+ "px",mt:drawerWidth /14+ "px"}}>
			{[].map((text, index) => (
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
            <ListItemButton >
                <ListItemIcon>
                	{index == 0 && <LogoutIcon color='primary'/>}
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItemButton>
            </ListItem>
        ))}
      	</List>
      
    </div>
  );



  const container = window !== undefined ? () => window().document.body : undefined;

  	return (
		<Box >
			{/* <CssBaseline /> */}
			{/* Box 1111111*/}
			{/* הסרגל העליון */}
			<AppBar
				position="static"
				sx={{
				width : { sm: `calc(100% - ${drawerWidth}px)` },
				mr: { sm: `${drawerWidth}px` },
				}}
			>
				<Toolbar>
				
				<Typography variant="h6" noWrap component="div">
					Responsive drawer
				</Typography>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					
					onClick={handleDrawerToggle}
					sx={{ display: { sm: 'none' }, position: "absolute", right: "10px"}}
				>
					<MenuIcon />
				</IconButton>
				</Toolbar>
			</AppBar>

			{/* Box 2222222*/}
			{/* תוכן הדף*/}
			<Box
				component="main"
				sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
			>
				{/* {props.body} */}
				{/* </Typography> */}
			</Box>


			{/* Box 33333333*/}
			{/* מגירה - 2 מגרות לכאשר גולי וכאשר נסתר */}
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="mailbox folders"
			>
				
				<Drawer
				container={container}
				variant="temporary"
				anchor="right"
				
				open={mobileOpen}
				onClose={handleDrawerToggle}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile.
				}}
				sx={{
					display: { xs: 'block', sm: 'none' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
				}}
				>
					{drawer}
				</Drawer>

			
				<Drawer
				variant="permanent"
				anchor="right"
				sx={{
					display: { xs: 'none', sm: 'block' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
				}}
				open
				>
					{drawer}
				</Drawer>	
			</Box>
			
		</Box>
  	);
}

export default Temp7;
