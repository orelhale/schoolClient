

function Popup_editUser(userToEdit) {


   return (
      <>
         {userToEdit &&
            <div className="wrapEditUser">
               <Box
                  sx={{
                     display: 'flex',
                     flexWrap: 'wrap',
                     '& > :not(style)': {
                        m: 1,
                        width: 350,
                        height: 500,
                     },
                  }}
               >
                  <Paper elevation={3} sx={{ padding: "30px", }}>
                     <Style_BackButton onClick={() => { setUserToEdit(null) }} />
                     <div className="ontainerEditUser">
                        <EditUser dataToEditUser={userToEdit} setDateFromServer={setDateFromServer} setUserToEdit={setUserToEdit} />
                     </div>
                  </Paper>
               </Box>

            </div>
         }
      </>
   )
}

export default Popup_editUser;