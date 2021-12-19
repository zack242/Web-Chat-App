
/** @jsxImportSource @emotion/react */
import {useContext, useEffect} from 'react';
import axios from 'axios';
// Layout
import { useTheme } from '@mui/styles';
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
// Local
import Context from './Context'
import {useNavigate} from 'react-router-dom'
import ResponsiveDialog from './addChannel';
import ImageAvatars from './avatar.js'


const useStyles = (theme) => ({
  profil : {
   borderBottom : '0px solid white',
 },
 liste : {
   textDecoration: 'none' ,
   borderBottom : '1px solid white',
   borderTop : '1px solid white',
 },
})


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function Channels() {
  const {
    oauth,
    channels,setChannels
  } = useContext(Context)

  const navigate = useNavigate()
  const styles = useStyles(useTheme())

  useEffect(() => {
      const fetch = async () => {
      try{
        const {data: channels} = await axios.get('http://localhost:3001/channels', {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`,}})

      setChannels(channels)
      }catch(err){
        console.error(err)}
     }
     fetch()
  },[oauth, setChannels])

  return(
    <div>
    <div css={styles.profil}>
        <center css={{marginTop : '10px'}}>
          <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
            <ImageAvatars email={oauth.email} size={90} />
          </StyledBadge>

        <h4> {oauth.username} </h4>
        <h5> {oauth.email} </h5>

        <Stack direction="row" spacing={2}>

        <IconButton aria-label="delete" size="large">
        <SearchIcon fontSize="large" color="secondary" />
        </IconButton>

        <ResponsiveDialog/>

        <IconButton aria-label="delete" size="large">
        <SettingsIcon fontSize="large" color="secondary"  onClick={() => {navigate('/')}}/>
        </IconButton>

        </Stack>
        </center>
    </div>

    <List>
     {channels.map((channel, i) => (

          <ListItem button key={i} href={`/channels/${channel.id}`}
           onClick={ (e) => {
           e.preventDefault()
           navigate(`/channels/${channel.id}`)}}
           css={styles.liste}>

           <ListItemText primary={channel.name} secondary='Last Message'/>

           <Badge badgeContent={1} color="success">
              <MailIcon color="secondary" />
           </Badge>

          </ListItem>
      ))}
    </List>

</div>);
}
