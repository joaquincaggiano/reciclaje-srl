import  CircularProgress  from '@mui/material/CircularProgress'
import Box from "@mui/material/Box";
import Typography  from "@mui/material/Typography";

export const FullScreenLoading = () => {
  return (
    <Box 
        display='flex' 
        flexDirection='column'
        justifyContent='center' 
        alignItems='center' 
        height='calc(100vh - 200px)'
    >
        <Typography sx={{ mb: 3 }} variant="h2" fontWeight={ 200 } fontSize={ 20 }>Cargando...</Typography>
        <CircularProgress thickness={ 2 } />
    </Box>
  )
}
