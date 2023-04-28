

function PopupTemplate({ styleBox = { m: 1, width: 350, height: 500 }, stylePaper = { padding: "30px" }, type = 3, body }) {


   return (
      <div className="wrapEditUser">
         <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': styleBox }}>
            <Paper elevation={type} sx={stylePaper}>{body}</Paper>
         </Box>
      </div>
   )
}

export default PopupTemplate;