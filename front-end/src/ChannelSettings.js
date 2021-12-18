import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import Autocomplete from '@mui/material/Autocomplete';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import Context from './Context'
import {useContext,useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open1, setOpen1] = useState(false);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const { id } = useParams()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const {channels,oauth} = useContext(Context)
  const channel = channels.find( channel => channel.id === id)
  const [members,setMembers] = useState(channel.members)
  
  const users = ['zakaria_009@hotmail.fr','zakaria.tozy@icloud.com','admin@example.com','nezri.dan@gmail.com'];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const onTagsChange = (event, values) => {
    setMembers(values)

  };

  const onSubmit = async () =>
  {
    channel.members = members;
    console.log(channel);
    const ChannelObj = await axios.put(`http://localhost:3001/channels/${id}`,{channel})
      console.log('chchc');
      console.log(ChannelObj);
      console.log(ChannelObj);
  }

  return (
    <div>
    <IconButton
       aria-label="more"
       id="long-button"
       aria-controls="long-menu"
       aria-expanded={open ? 'true' : undefined}
       aria-haspopup="true"
       onClick={handleClick}>
       <MoreVertIcon color='secondary' />
     </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        <MenuItem onClick={handleClose}>Channel</MenuItem>
        <MenuItem onClick={handleClickOpen1}>Members</MenuItem>
        <MenuItem onClick={handleClose}></MenuItem>
      </Menu>

      <div>

        <Dialog
          fullScreen={fullScreen}
          open={open1}
          onClose={handleClose1}
          aria-labelledby="responsive-dialog-title"
        >
        <Stack spacing={2} justifyContent="center" >

        <Autocomplete
         multiple
         id="tags-standard"
         options={users}
         onChange={onTagsChange}
         defaultValue={members}
         getOptionLabel={(option) => option}
         renderInput={(params) => (
           <TextField
            {...params}
            variant="filled"
            label="Members"
            placeholder="example@user.com"
            /> )}/>

            <DialogActions>
              <center>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={0}>

                  <IconButton aria-label="delete" size="large" onClick={handleClose1}>
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
        </Dialog>
      </div>

    </div>
  );
}
