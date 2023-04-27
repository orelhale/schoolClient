import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';


export default function StyleFor_Login(props) {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar >
          <Typography variant="h6" noWrap component="div">
						School Tech
					</Typography>
        </Toolbar>
      </AppBar>
      
      {props.bodyOfBasicDesign}

    </Box>
  );
}



