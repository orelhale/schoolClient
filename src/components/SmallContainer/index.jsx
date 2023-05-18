
import { Box, Paper } from "@mui/material"

export default function SmallContainer({
   containerStyle = { width: 550, padding: 3, },
   paperStyle = {},
   children,
   defaultStyle = { display: 'flex', flexWrap: 'wrap', "justifyContent": 'center' },
}) {

   return (
      <Box sx={{ ...defaultStyle, '& > :not(style)': { ...containerStyle }, }}>
         <Paper elevation={3} sx={{ ...paperStyle }}>
            {children}
         </Paper>
      </Box>
   )
}