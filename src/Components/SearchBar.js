import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useState  } from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { summarizeData,roast } from './req';

function SearchBar() {
  const [response,setResponse] = useState("")

  const handleSummarize =async () => {
    const data={ language:language , url : url}; 
    const result = await summarizeData(data);
    console.log(result)
    setResponse(result.data.message.content);
  };

  const handleRoast = async () => {
    const data={ language:language , url : url};
    const response =await roast(data);
     setResponse(response.data.message.content);

  };
const [url, setUrl ] = useState("")

const [language, setLanguage] = useState("")
const handleLanguageChange = (event) => {
  setLanguage(event.target.value);
};
const[canSendData, setCanSendData]=useState(false)
const [errorMessage,setErrorMessage] = useState("")


const validateURL=(url)=>{
  const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/;
if(urlPattern.test(url)){
  setCanSendData(true)
  setErrorMessage("")
  setUrl(url)
}else{
  setErrorMessage("Please enter a valid URL")
  setCanSendData(false)
}
}
  return (
  <Box  sx={{
  
    display : 'flex',
    alignItems:'center',
    
    flexDirection: 'column'

    
      }}>

<FormControl error variant="standard">

    <Box sx={{
  
  display : 'flex',
  alignItems:'center',
  
  flexDirection: 'align'

  
    }}>
      
      <TextField error={errorMessage.length>0}
onChange={(event) => {
        validateURL(event.target.value);
      }}
   id="outlined-basic" label="Enter Website URL" variant="outlined" sx={{
  outlineColor:'#002B40',
  width:'70vh'}}> 

</TextField>



  <FormControl style={{ width: '30%' }} >
        <InputLabel >Language</InputLabel>
        <Select
          value={language}
    label="langue"
    onChange={handleLanguageChange}>
        <MenuItem value=""><em>None</em></MenuItem>        
        <MenuItem value={"fr"}>French</MenuItem>
        <MenuItem value={"en"}>English</MenuItem>
        </Select>
      </FormControl>

  </Box>
<FormHelperText id="component-error-text">{errorMessage}</FormHelperText>

</FormControl>
<Stack spacing={2} direction="row" sx={{
  
  marginTop:5
  
    }}>

<Button variant="contained" disabled={!canSendData} onClick={handleSummarize}>
        Summarize
      </Button>
      <Button variant="contained" disabled={!canSendData} onClick={handleRoast}>
        Roast
      </Button>
</Stack>


<div>
  {response}
</div>

  </Box>


  );
}

export default SearchBar;
