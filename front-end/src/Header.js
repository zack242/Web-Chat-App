
/** @jsxImportSource @emotion/react */
import { useContext } from 'react';
import { styled } from '@mui/material/styles';
// Layout
import { useTheme } from '@mui/styles';
import { IconButton, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useParams } from 'react-router-dom';

import Context from './Context';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import image from './logo.png';

const useStyles = (theme) => ({
  header: {
    padding: theme.spacing(0.75),
    backgroundColor: 'black',
    flexShrink: 0,
  },
  headerLogIn: {
    backgroundColor: 'red',
  },
  headerLogOut: {
    backgroundColor: 'blue',
  },
  menu: {
    [theme.breakpoints.up('sm')]: {
      display: 'none !important',
    },
  },
  image :
  {
   height : '70px',
   width : '70px',

 },
})



export default function Header({
  drawerToggleListener,
}) {
  const styles = useStyles(useTheme())
  const {
    oauth, setOauth,
    drawerVisible, setDrawerVisible,
    channels,

  } = useContext(Context)
  let id = window.location.pathname.substring(10);
  const channel = channels.find( channel => channel.id === id)

  const drawerToggle = (e) => {
    setDrawerVisible(!drawerVisible)
  }
  const onClickLogout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }

  return (
    <header css={styles.header}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={drawerToggle}
        css={styles.menu}>
        <MenuIcon />

      </IconButton>
      {
        oauth ?
          <span>

        <Grid container spacing={3} columns={5} css={{borderBottom:'solid 4px #0C4664 '}}>

            <Grid item xs={1}>
              <div css={{backgroundColor:'black',textAlign: 'center'}}>   <img src={image} css={styles.image}/> </div>
            </Grid>

            <Grid item xs={3}>
              <div css={{backgroundColor:'black',textAlign: 'center'}}>   <h2> { channel ? channel.name : 'NetoChat' } </h2> </div>
            </Grid>

            <Grid item xs={1}>

            <div css={{backgroundColor:'black', textAlign: 'right'}}>
              <IconButton aria-label="delete" size="large" onClick={onClickLogout}>
                <DeleteIcon />
                </IconButton>
            </div>
            </Grid>

        </Grid>
          </span>
        :
        <span></span>

      }
    </header>
  );
}
