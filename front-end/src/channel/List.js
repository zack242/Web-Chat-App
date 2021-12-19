
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
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Gravatar from 'react-gravatar'
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Fade from '@mui/material/Fade';

import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import updateLocale from 'dayjs/plugin/updateLocale'
import axios from 'axios';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DehazeIcon from '@mui/icons-material/Dehaze';

import ImageAvatars from '../avatar.js'


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
  const [isEditMode, setisEditMode] = useState(true);
  const [editedMessage, setEditedMessage] = useState('');
  const [index, setIndex] = useState('-1');


    const handleEdit = (index) => {
    setIndex(index)
    setEditedMessage(messages[index].content)
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


    const handleDelete = async (index) =>
    {
       console.log('on supprimer')
       console.log(index);
       const creation = messages[index].creation
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

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleCloseItem = () => {
      setAnchorEl(null);
  };

  const handleEditMode = () =>
  {
    setisEditMode(!isEditMode)
    console.log('ok');

  }

  const handletest = (e) =>
  {
    var today = Date(e);
    console.log(today);

  }



    return (
       <div css={styles.root} ref={rootEl}>
       <ul>
        { messages.map((message, i) => {

          const {value} = unified().use(markdown).use(remark2rehype).use(html).processSync(message.content);
          const time = message.date

          return (
                <li key={i}>

                  <Paper sx={{ p: 2, margin: 'auto', maxWidth: 1000, flexGrow: 1, marginBottom: '10px;' }}>
                    <Grid container spacing={2}>
                      <Grid item>
                        <ImageAvatars email={message.authorid} />
                      </Grid>
                        <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                          <Grid item xs>
                            <Typography gutterBottom variant="subtitle1" component="div">
                              <h4>{message.author}</h4>
                            </Typography>
                            <Typography variant="body2" gutterBottom>
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

                                </span>)
                              :
                              (
                                <span> {message.content}
                                </span>
                              )

                            }
                           </Grid>
                            </Typography>

                          </Grid>
                          <Grid item>
                          <div>

                      { isEditMode ?
                        (
                          <div>
                         <IconButton>
                            <DehazeIcon color="secondary"  onClick={handleEditMode}/>
                         </IconButton>
                         </div>
                       )
                       :
                       (
                         <div>

                         <IconButton>
                          <EditIcon color="secondary" onClick={() => handleEdit(i)}/>
                         </IconButton>


                         <IconButton color="secondary" value={i} onClick={() => handleDelete(i)}>
                          <DeleteIcon color="secondary"/>
                         </IconButton>


                         <IconButton color="secondary" onClick={handleEditMode}>
                           <CancelIcon/>
                         </IconButton>
                         </div>
                       ) }

                       </div>

                          </Grid>
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle1" component="div">
                          <h5>
                           {time}
                           </h5>

                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </li>)})}
                </ul>

    <div ref={scrollEl}/>
    </div>

  )})
