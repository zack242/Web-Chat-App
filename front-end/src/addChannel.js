import * as React from 'react';
import { useState } from 'react'
import axios from 'axios';
import {useContext} from 'react';
import { FixedSizeList } from 'react-window';
import Context from './Context';
//Layout
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
//local
import Autocomplete from '@mui/material/Autocomplete';
import Tooltip from '@mui/material/Tooltip';
import CancelIcon from '@mui/icons-material/Cancel';
import {useNavigate} from 'react-router-dom'


export default function ResponsiveDialog() {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const {channels, setChannels,oauth} = useContext(Context);
  const [content, setContent] = useState('');
  const [members, setMembers] = useState('[]');
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate()


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false)
    setMembers('[]')
    setContent('')
  };

  const handleChange = (e) => {
    setContent(e.target.value)
  }
  const onTagsChange = (event, values) => {
    setMembers(values)
  };

  const onSubmit = async () => {


  const  ChannelObj = await axios.post(`http://localhost:3001/channels/`,
     {name:content,members:members},{
     headers:{
       'Authorization': `Bearer ${oauth.access_token}`
     }})
     setChannels([...channels,ChannelObj.data])
     setContent('')
     setMembers('[]')
     setOpen(false)
     navigate(`/channels/${ChannelObj.data.id}`)
   }

return(
    <div>
      <IconButton aria-label="delete" size="large" onClick={handleClickOpen}>
      <AddCircleIcon fontSize="large" color="secondary" />
      </IconButton>

    <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title">


    <DialogTitle id="responsive-dialog-title">
      <center><h2>Create new channel</h2></center>
    </DialogTitle>

     <DialogContent>

      <form onSubmit={onSubmit} noValidate>
      <Stack spacing={2} justifyContent="center" >
      <TextField
        variant="filled"
        label="Channel name"
        value={content}
        onChange={handleChange}/>

        <Autocomplete
         multiple
         id="tags-standard"
         options={users}
         onChange={onTagsChange}
         getOptionLabel={(option) => option}

         renderInput={(params) => (
           <TextField
            {...params}
            variant="filled"
            label="Members"
            placeholder="example@user.com"
            /> )}
        />
                <DialogActions>
                  <center>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={0}>

                      <IconButton aria-label="delete" size="large" onClick={handleClose}>
                          <Tooltip title="Cancel">
                          <CancelIcon fontSize="large" color="secondary" />
                          </Tooltip>
                      </IconButton>

                      <IconButton aria-label="delete" size="large" >
                          <Tooltip title="Add">
                          <AddCircleIcon fontSize="large" color="secondary" onClick={onSubmit}/>
                          </Tooltip>
                      </IconButton>
                      </Stack>
                    </center>
                 </DialogActions>
              </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const users = ['zakaria_009@hotmail.fr','zakaria.tozy@icloud.com','admin@example.com','nezri.dan@gmail.com'];
