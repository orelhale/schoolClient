
import { Box, Paper } from "@mui/material"


export default function SmallContainer({ containerStyle = {}, paperStyle = {}, children }) {
   return (
      <Box
         sx={{
            display: 'flex',
            flexWrap: 'wrap',
            "justifyContent": 'center',
            '& > :not(style)': {
               width: 550,
               padding: 3,
               ...containerStyle
            },
         }}
      >
         <Paper elevation={3} sx={{ ...paperStyle }}>
            {children}
         </Paper>
      </Box>

   )
}