
/** @jsxImportSource @emotion/react */
import {useContext, useEffect} from 'react';
import axios from 'axios';
// Layout
import {Link} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// Local
import Context from './Context'
import {useNavigate} from 'react-router-dom'
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import DraftsIcon from '@mui/icons-material/Drafts';

const styles = {
  root: {
    '& a': {
      padding: '.2rem .5rem',
      whiteSpace: 'nowrap',
    },
  },
  channel: {
  padding: '.2rem .5rem',
  whiteSpace: 'nowrap',
  borderright : '5px solid white',
  fontSize : '25px',
  marginBottom: '5px',
  marginTop:'5px',
}
}

export default function Channels() {
  const {
    oauth,
    channels, setChannels
  } = useContext(Context)
  const naviate = useNavigate();
  useEffect( () => {
    const fetch = async () => {
      try{
        const {data: channels} = await axios.get('http://localhost:3001/channels', {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })
        setChannels(channels)
      }catch(err){
        console.error(err)
      }
    }
    fetch()
  }, [oauth, setChannels])
  return (
    <ul css={styles.root}>
      <h6>{oauth.email}</h6>

      <nav aria-label="main mailbox folders">
      <List>
      <Link to="/channels" component={RouterLink}>
            <ListItem disablePadding href="/channels">
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Home page" css={{ color: 'white' }}/>
              </ListItemButton>
            </ListItem>
       </Link>
       </List>
  </nav>
  <Divider />

<List>
      { channels.map( (channel, i) => (

           <ListItem button key={i} css={styles.channel}
            href={`/channels/${channel.id}`}
            onClick={ (e) => {
              e.preventDefault()
              naviate(`/channels/${channel.id}`)
            }}
              css={{ textDecoration: 'none' }}>

            <ListItemAvatar>
            <Avatar>
            <InboxIcon />
            </Avatar>
            </ListItemAvatar>

            <ListItemText primary={channel.name} secondary='last message'/>

            </ListItem>
          ))}
</List>
</ul>);
}
