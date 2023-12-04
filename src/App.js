import './App.css';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import SearchBar from './Components/SearchBar';

function App() {
  return (
  <Box sx={{
backgroundColor : '#E3FFEE', 
height : '100vh',
display : 'flex',
flexDirection: 'column',
alignItems:'center',
padding:1

  }}>

<Typography variant="h1" gutterBottom sx={{color:'#002B40',
margin:15
}}>
  What does this company do ?
</Typography>
<SearchBar/>

  </Box>


  );
}

export default App;
