import { Box, Stack, Typography, Button, useTheme } from "@mui/material";
// @ts-ignore
import Logo from "../../assets/images/logo.png";
import AddIcon from '@mui/icons-material/Add';

const Dashboard = () => {
  const theme = useTheme();
  
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center"
      mt={3}
    >
      <img style={{ width: "300px", marginBottom: "20px" }} src={Logo} alt="GoalMaster Logo" />
      
      <Typography variant="h5" color="secondary" textAlign="center" mb={2}>
        Welcome to <strong>GoalMaster</strong> 🎯  
      </Typography>
      <Typography variant="body1" color="textSecondary" textAlign="center" mb={3}>
        Set your goals, organize tasks, and boost your productivity!
      </Typography>
      
      <Button 
        variant="contained" 
        color="primary" 
        size="large"
        sx={{ borderRadius: "8px", textTransform: "none", fontSize: "16px",
          fontWeight : '600'
        }}
        style={{textTransform : 'uppercase' }}
      >
        Add Your First Task <AddIcon sx={{mb : '3px' , ml : 1}}/>
      </Button>
    </Box>
  );
};

export default Dashboard;

