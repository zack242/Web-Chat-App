/** @jsxImportSource @emotion/react */
import {useContext,useState} from 'react';
import axios from 'axios';
// Local
import Context from './Context'
import avatar1 from './icons/avatar1.png';
import avatar2 from './icons/avatar2.png';
import avatar3 from './icons/avatar3.png';
import avatar4 from './icons/avatar4.jpg';
import avatar5 from './icons/avatar5.png';
// Layout
import { useTheme } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Gravatar from 'react-circle-gravatar'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Stack from '@mui/material/Stack';


const useStyles = (theme) => ({
  root: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflowX: 'auto',

  },
  container :
  {

  },
  image:
  {
        borderRadius: "50%",
        width: 90,
        height: 90,
        display: "block"
  },
  pdp:
  {
        borderRadius: "50%",
        width: 190,
        height: 190,
        display: "block"
  }
})

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export default function Settings() {

  const styles = useStyles(useTheme())
  const [isAvatar,setisAvatar] = useState(false)
  const [isGravavatar,setisGravavatar] = useState(true)
  const [avatar,setAvatar]=useState(avatar1)

  const {
    oauth,
  } = useContext(Context)

  const handleChangeGravatar = (e,c) =>
  {
   setisGravavatar(c)
   setisAvatar(!isAvatar);
  }
  const handleChangeAvatar = (name) =>
  {
   setAvatar(name)
  }

 const label = { inputProps: { 'aria-label': 'Switch demo' } };

 const saveConfig = async () =>
 {
      await axios.put(`http://localhost:3001/users/${oauth.email}`,
      {id:oauth.email,email:oauth.email,avatar:avatar})

 }
 const saveConfig1 = async () =>
 {
      await axios.put(`http://localhost:3001/users/${oauth.email}`,
      {id:oauth.email,email:oauth.email})

 }


  return(

     <div css={styles.root}>
       <center>
        <div css={styles.container}>

          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}>

          {isGravavatar ? (
          <div>
          <Gravatar size={190} email={oauth.email} rating="g"/>
          <h5>Gravatar avatar</h5>
          </div>
        ) : (
          <div>
          <img src={avatar} alt="Logo" css={styles.pdp}/>
          <h5>Custom avatar</h5>
          </div>)}

        <h5> Switch avatar </h5>
        <Switch {...label} defaultChecked onChange={handleChangeGravatar}/>

        { isAvatar ?
        (
        <div>
        <Stack spacing={3}>
        <ButtonGroup sx={{border:'1px solid white'}}>
            <Button onClick={() => handleChangeAvatar(avatar1)}> <img src={avatar1} alt="Logo" css={styles.image}/></Button>
            <Button onClick={() => handleChangeAvatar(avatar2)}> <img src={avatar2} alt="Logo" css={styles.image}/></Button>
            <Button onClick={() => handleChangeAvatar(avatar3)}> <img src={avatar3} alt="Logo" css={styles.image}/></Button>
            <Button onClick={() => handleChangeAvatar(avatar4)}> <img src={avatar4} alt="Logo" css={styles.image}/></Button>
            <Button onClick={() => handleChangeAvatar(avatar5)}> <img src={avatar5} alt="Logo" css={styles.image}/></Button>
        </ButtonGroup>
        <Button onClick={saveConfig}  variant="contained">use custome avatar</Button>
        </Stack>
        </div>)
         :
         (
           <div>
             <Button onClick={saveConfig1}  variant="contained">use gravatar</Button>
           </div>
         )
       }

        <Grid container spacing={2}>
           <Grid item xs={12} >
           <TextField   label="First name" variant="filled" />
           </Grid>

           <Grid item xs={12}>
           <TextField    id="filled-disabled" variant="filled" color="secondary" label="username"   />
           </Grid>

           <Grid item xs={12}>
           <TextField   id="outlined-basic" label={oauth.email} variant="filled" />

           </Grid>
           <Grid item xs={12}>
           <FormControlLabel
            control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
            label="Theme"/>
         </Grid>
       </Grid>
       </Stack>
    </div>
      </center>
    </div>

  );
}
