/** @jsxImportSource @emotion/react */
import {useContext, useRef, useState, useEffect} from 'react';
import axios from 'axios';
// Layout
import { useTheme } from '@mui/styles';
import {Fab} from '@mui/material';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
// Local
import Form from './channel/Form'
import List from './channel/List'
import Context from './Context'
import Header from './Header'
import { useNavigate, useParams } from 'react-router-dom'


const useStyles = (theme) => ({
  root: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflowX: 'auto',
  },
  fab: {
    position: 'absolute !important',
    top: theme.spacing(13),
    right: theme.spacing(2),
  },
  fabDisabled: {
    display: 'none !important',
  }
})

export default function Channel() {

  const styles = useStyles(useTheme())
  const navigate = useNavigate()
  const { id } = useParams()
  const {channels,oauth} = useContext(Context)
  const channel = channels.find( channel => channel.id === id)
  const listRef = useRef()
  const [messages, setMessages] = useState([])
  const [scrollDown, setScrollDown] = useState(false)
  const addMessage = (message) => {
    setMessages([...messages, message])
  }

  useEffect( () => {
  const fetch = async () => {
        try{
            const {data: messages} = await axios.get(`http://localhost:3001/channels/${id}/messages`,{
            headers: {
                'Authorization': `Bearer ${oauth.access_token}`
            }})

        setMessages(messages)
        // if(listRef.current){
        //     //listRef.current.scroll()
        // }
        }catch(err){
             navigate('/oups')
        }
        }

  const interval = setInterval(() => {fetch()},10);
  return () => clearInterval(interval);

  },[id, oauth, navigate])

  const onScrollDown = (scrollDown) => {
    setScrollDown(scrollDown)
  }

  const onClickScroll = () => {
    listRef.current.scroll()
  }

  const [drawerMobileVisible, setDrawerMobileVisible] = useState(false)

  const drawerToggleListener = () => {
    setDrawerMobileVisible(!drawerMobileVisible)
  }

  if(!channel){
    return (<div>loading</div>)
  }

  return(
     <div css={styles.root}>
            <Header drawerToggleListener={drawerToggleListener} />
              <List
                channel={channel}
                messages={messages}
                onScrollDown={onScrollDown}
                ref={listRef}/>

            <Form addMessage={addMessage} channel={channel}  />

           <Fab color="secondary"
                size = "small"
                aria-label="Latest messages"
                css={[styles.fab, scrollDown || styles.fabDisabled]}
                onClick={onClickScroll}>
            <ArrowDropDownRoundedIcon />
            </Fab>
    </div>
  );
}
