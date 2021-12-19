
/** @jsxImportSource @emotion/react */
import { useState,useContext} from 'react'
import axios from 'axios';
// Layout
import {Button} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/styles';
import Context from '../Context'
import InputEmoji from 'react-input-emoji'

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
    const [ text, setText ] = useState('')
    const {oauth} = useContext(Context)
    const styles = useStyles(useTheme())
    const onSubmit = async () => {
    const {data: message} = await axios.post(
        `http://localhost:3001/channels/${channel.id}/messages`
      , {
        content: text,
        author: oauth.username,
        authorid :oauth.email,
      })
      addMessage(message)
      setText('')

    }

  return (
      <form css={styles.form} onSubmit={onSubmit} noValidate>

        <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={onSubmit}
          placeholder="Type a message"
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
