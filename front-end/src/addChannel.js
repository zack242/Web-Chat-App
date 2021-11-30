import * as React from 'react';
import { useState } from 'react'
import axios from 'axios';
import {useContext} from 'react';
import { FixedSizeList } from 'react-window';
import Context from './Context';


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



export default function ResponsiveDialog() {

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const {channels, setChannels} = useContext(Context);
  const [content, setContent] = useState('');
  const [member, setMember] = useState('');
  const [members, setMembers] = useState([])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setContent(e.target.value)
  }
  const handleChange1 = (e) => {
    setMember(e.target.value)
  }

  const handleChangeMember = (e) => {
    addMember(member)
  }

  const addMember = (member) => {
    setMembers([...members, member])
    console.log(members);
  }

  const onSubmit = async () => {

   const  ChannelObj = await axios.post(`http://localhost:3001/channels/`,{name: content,})

     setChannels([...channels,ChannelObj.data])
     setContent('')
     setMembers([])
     setOpen(false);
  }



return (

    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title">

        <DialogTitle id="responsive-dialog-title">
           <span>Create new Channel</span>
        </DialogTitle>

        <DialogContent>
        <form onSubmit={onSubmit} noValidate>

          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx"
                label="Channel Name"
                variant="standard"
                value={content}
                onChange={handleChange} />
          </Box>

          <Grid container container width='250px'>
          {members.map((member, i) => (
            <Grid item xs>
              <Chip avatar={<Avatar>@</Avatar>}  key={i} label={member} size='small' />
            </Grid>
          ))}
          </Grid>
        
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField id="input-with-sx"
                    label="Member e-mail"
                    variant="standard"
                    value={member}
                    onChange={handleChange1}/>
          </Box>

          <div>
            <DialogActions>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}>

            <Button
              variant="contained"
              color="primary"
              onClick={handleChangeMember}>
              Add Member
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={onSubmit}>
              Add Channel
            </Button>
            </Stack>

            </DialogActions>
          </div>

        </form>
        </DialogContent>

      </Dialog>
    </div>
  );
}
