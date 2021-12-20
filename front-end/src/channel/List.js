
/** @jsxImportSource @emotion/react */
import {forwardRef, useImperativeHandle, useLayoutEffect, useRef,useState} from 'react'
import {useTheme} from '@mui/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

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
  const throttleTimeout = useRef(null) // react-hooks/exhaustive-deps
  const [isEditable, setisEditable] = useState(true);
  const [isEditMode, setisEditMode] = useState(true);
  const [editedMessage, setEditedMessage] = useState('');
  const [index, setIndex] = useState('-1');



  const scroll = () => {
    scrollEl.current.scrollIntoView()
   }
  const handleEdit = (index) => {
    setIndex(index)
    setEditedMessage(messages[index].content)
    setisEditable(!isEditable)
  }
  const handleChangeEdit = (e) => {
      setEditedMessage(e.target.value)
  }

  const handleSetEdited = async () => {
      messages[index].content=editedMessage;
      setisEditable(!isEditable)
      await axios.put(`http://localhost:3001/channels/${channel.id}/messages`,
        {
          content: messages[index]
        }
    )}

    const handleClose = () =>
    {
        setisEditable(!isEditable)}

    const handleDelete = async (index) =>
    {
       const creation = messages[index].creation
       await axios.put(`http://localhost:3001/channels/${channel.id}/${creation}`)}

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

    const handleEditMode = () =>
    { setisEditMode(!isEditMode) }



    return (
       <div css={styles.root} ref={rootEl}>
       <ul>
        { messages.map((message, i) => {
          const time = message.date
          return (
                <li key={i}>

                  <Paper sx={{ p: 2, margin: 'auto', maxWidth: 1000, flexGrow: 1, marginBottom: '10px;' }}>
                    <Grid container spacing={2}>
                      <Grid item>
                        <ImageAvatars email={message.authorid} size={60} />
                      </Grid>
                        <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                          <Grid item xs>
                            <Typography gutterBottom variant="subtitle1" component="div">
                              <h4>{message.author}</h4>
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                            <Grid item="item" xs="xs">
                            { (isEditable && i===index) ?

                              (
                                <span>
                                <TextField
                                  value={editedMessage}
                                  onChange={handleChangeEdit}
                                  label={message.content}
                                  maxRows={2}/>

                                  <IconButton  onClick={handleSetEdited}>
                                   <SaveIcon color="secondary"/>
                                  </IconButton>

                                  <IconButton  onClick={handleClose}>
                                    <CancelIcon color="secondary"/>
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
