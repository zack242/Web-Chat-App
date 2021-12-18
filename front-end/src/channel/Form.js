
/** @jsxImportSource @emotion/react */
import { useState,useContext} from 'react'
import axios from 'axios';
// Layout
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/styles';
import Context from '../Context'
import Emoji from './emoji'

const useStyles = (theme) => {
  return {
    form: {
      borderTop: `4px solid white`,
      padding: '.5rem',
      display: 'flex',
    },
    content: {
      flex: '1 1 auto',
      '&.MuiTextField-root': {
        marginRight: theme.spacing(1)
      },
    },
    send: {
      height:'55px;',
    },
  }
}

export default function Form({
  addMessage,
  channel,
}) {
    const [content, setContent] = useState('')
    const {oauth} = useContext(Context)
    const styles = useStyles(useTheme())
    const onSubmit = async () => {
    const {data: message} = await axios.post(
        `http://localhost:3001/channels/${channel.id}/messages`
      , {
        content: content,
        author: oauth.username,
      })
      addMessage(message)
      setContent('')
    }

    const handleChange = (e) => {
      setContent(e.target.value)
    }
  return (
      <form css={styles.form} onSubmit={onSubmit} noValidate>
        <TextField
          id="outlined-multiline-flexible"
          label="Message"
          multiline
          maxRows={4}
          value={content}
          onChange={handleChange}
          variant="outlined"
          css={styles.content}
        />

        

      <div>
        <Button
          variant="contained"
          color="secondary"
          css={styles.send}
          endIcon={<SendIcon />}
          onClick={onSubmit}
        >
        </Button>
      </div>

    </form>
  )
}
