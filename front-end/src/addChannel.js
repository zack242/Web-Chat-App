import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react'
import axios from 'axios';
import { TextField } from '@mui/material';

export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [content, setContent] = useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setContent(e.target.value)
  }

  const onSubmit = async () => {
  await axios.post(
    `http://localhost:3001/channels/`
    , {
      name: content,
    })
    setContent('')
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
        Create a new channel
        </DialogTitle>
        <DialogContent>
        <form  onSubmit={onSubmit} noValidate>
          <TextField
            id="outlined-multiline-flexible"
            label="Message"
            multiline
            maxRows={4}
            value={content}
            onChange={handleChange}
            variant="outlined"
          />
          <div>

            <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={onSubmit}
              >
              Add Channel
            </Button>
            </DialogActions>
          </div>
        </form>
        </DialogContent>


      </Dialog>
    </div>
  );
}
