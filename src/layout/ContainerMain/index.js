
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import RuleOutlinedIcon from '@mui/icons-material/RuleOutlined';

import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';


function ContainerMain({ window, nameUser = "", family = "",role="", listButtons, logOut, showListButtons = true, children }) {

	// const = props;
	const [mobileOpen, setMobileOpen] = useState(false);
	const [checkOpenListExams, setCheckOpenListExams] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const openListOfExams = () => {
		setCheckOpenListExams(checkOpenListExams ? false : true)
		console.log("openListOfExams");
	};

	const drawerWidth = showListButtons ? 240 : 0;


	// 00000 משתנה שמחיק את התוכן של 2 המגרות
	const drawer = (
		<>
			{/* החלק הכי עליון של המגרה */}
			<Toolbar><ListItemIcon><Avatar><PersonIcon /></Avatar></ListItemIcon>
				{nameUser} {family}
			</Toolbar>

			<Divider />{listButtons}<Divider />

			<List>
				{['log out'].map((text, index) => (
					<ListItem key={text} disablePadding >
						<ListItemButton onClick={logOut}>
							<ListItemIcon>
								{index == 0 && <LogoutIcon color='primary' />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</>
	);

	const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<Box >
			{/* Box 1111111*/}
			{/* הסרגל העליון */}
			<AppBar position="static" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, mr: { sm: `${drawerWidth}px` }, }}>
				<Toolbar>
					<Typography variant="h6" noWrap component="div">
						School Tech
					</Typography>

					<IconButton color="inherit" aria-label="open drawer" edge="start" sx={{ display: { sm: 'none' }, position: "absolute", right: "10px" }} onClick={handleDrawerToggle}>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</AppBar>

			{/* Box 2222222*/}
			{/* תוכן הדף*/}
			<Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
				{children}
			</Box>


			{/* Box 33333333*/}
			{/* מגירה - 2 מגרות לכאשר גולי וכאשר נסתר */}
			{drawer && <><Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">

				<Drawer container={container} variant="temporary" anchor="right" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }, }}>
					{drawer}
				</Drawer>


				<Drawer variant="permanent" anchor="right" sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }, }} open >
					{drawer}
				</Drawer>
			</Box></>}

		</Box>
	);
}

export default ContainerMain;