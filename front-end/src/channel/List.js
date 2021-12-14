
/** @jsxImportSource @emotion/react */
import {forwardRef, useImperativeHandle, useLayoutEffect, useRef,useState,useContext} from 'react'
import {useTheme} from '@mui/styles';
import {unified} from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import html from 'rehype-stringify'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Context from '../Context'
import FullFeaturedCrudGrid from '../tmp.js'
import ContentEditable from 'react-contenteditable'
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Gravatar from 'react-gravatar'



import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import updateLocale from 'dayjs/plugin/updateLocale'
import axios from 'axios';

dayjs.extend(calendar)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', { calendar: { sameElse: ' hh:mm A'}})


const useStyles = (theme) => ({
    root: {
      position: 'relative',
      flex: '1 1 auto',
      overflow: 'auto',
      color: 'black',
      '& ul': {
        'margin': 0,
        'padding': 0,
        'textIndent': 0,
        'listStyleType': 0
      },
    },
    message: {
      padding: '.2rem .5rem',
      ':hover': {
        border: '1px solid white'
      },
      backgroundColor: 'white',
      marginBottom: '.9rem',
      borderRadius: '25px'
    },
    fabWrapper: {
      position: 'absolute',
      right: 0,
      top: 0,
      width: '50px'
    },
    fab: {
      position: 'fixed !important',
      top: 0,
      width: '50px'
    }})


export default forwardRef(({
  channel,
  messages,
  onScrollDown
  },ref) =>

{
  const styles = useStyles(useTheme())
  // Expose the `scroll` action
  useImperativeHandle(ref, () => ({ scroll: scroll }));
  const rootEl = useRef(null)
  const scrollEl = useRef(null)
  const scroll = () => {
    scrollEl.current.scrollIntoView()
   }
  const throttleTimeout = useRef(null) // react-hooks/exhaustive-deps
  const [isEditable, setisEditable] = useState(true);
  const [editedMessage, setEditedMessage] = useState('');
  const [index, setIndex] = useState('-1');


    const handleEdit = (e) => {
    setIndex(e.target.value)
    setEditedMessage(messages[e.target.value].content)
    setisEditable(!isEditable)
   }

    const handleChangeEdit = (e) => {
      setEditedMessage(e.target.value)
    }

    const handleSetEdited = async () =>
    {
      console.log(messages[index].content);
      messages[index].content=editedMessage;
      setisEditable(!isEditable)


      await axios.put(`http://localhost:3001/channels/${channel.id}/messages`,
        {
          content: messages[index]
        }

    )}

    const handleClose = () =>
    {
        setisEditable(!isEditable)
        console.log('on close')
      }


    const handleDelete = async (e) =>
    {
       console.log('on supprimer')
       const creation = messages[e.target.value].creation
       await axios.put(`http://localhost:3001/channels/${channel.id}/${creation}`)
     }

    useLayoutEffect(() => {

    const rootNode = rootEl.current // react-hooks/exhaustive-deps

    const handleScroll = () => {
        if (throttleTimeout.current === null) {
            throttleTimeout.current = setTimeout(() => {
            throttleTimeout.current = null
    const {scrollTop, offsetHeight, scrollHeight} = rootNode // react-hooks/exhaustive-deps
           onScrollDown(scrollTop + offsetHeight < scrollHeight)}, 200)}}

    handleScroll()
    rootNode.addEventListener('scroll', handleScroll)
    return () => rootNode.removeEventListener('scroll', handleScroll)

    })

    return (
       <div css={styles.root} ref={rootEl}>
       <ul>
        { messages.map((message, i) => {

          const {value} = unified().use(markdown).use(remark2rehype).use(html).processSync(message.content);
          return (
                <li key={i}>
                    <Paper sx={{maxWidth: '100%',my: 1,mx: 'auto',p: 2}} elevation={1}>
                       <Grid container="container" wrap="wrap" spacing={2}>
                        <Grid item="item">
                        <Gravatar size={50} email="zakaria_009@hotmail.fr" rating="g" default="mm"/>
                         {message.author}
                        <h6 css={{textAlign: 'right'}}>{dayjs().calendar(message.creation)}</h6>
                        </Grid>

                        <Grid item="item" xs="xs">
                        { (isEditable && i==index) ?

                          (
                            <span>
                            <TextField
                              value={editedMessage}
                              onChange={handleChangeEdit}
                              label={message.content}
                              maxRows={2}/>

                              <IconButton  onClick={handleSetEdited}>
                               <SaveIcon />
                              </IconButton>

                              <IconButton  onClick={handleClose}>
                                <CancelIcon/>
                              </IconButton>

                            </span>
                        )
                          :
                          (
                            <span> {message.content}

                                 <Tooltip title="Delete">
                                  <Button value={i} onClick={handleDelete}>Sup</Button>
                                 </Tooltip>

                                 <Tooltip describeChild title="Does not add if it already exists.">
                                 <Button value={i} onClick={handleEdit}>Mod</Button>
                                 </Tooltip>
                            </span>
                          )

                        }
                       </Grid>
                    </Grid>

                  </Paper>
                </li>)})}
                </ul>

    <div ref={scrollEl}/>
    </div>

  )})
