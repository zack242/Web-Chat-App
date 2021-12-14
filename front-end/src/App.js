/** @jsxImportSource @emotion/react */
import { useContext, useState } from 'react'
import { useTheme } from '@mui/styles';
// Local
import Oups from './Oups'
import Header from './Header'
import Main from './Main'
import Login from './Login'
import Context from './Context'
import Settings from './Settings'
// Rooter
import {Route,Routes,Navigate,useLocation} from "react-router-dom"


const useStyles = (theme) => ({
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.background.default,
  },
})


export default function App() {

  const styles = useStyles(useTheme())
  const location = useLocation()
  const {oauth} = useContext(Context)

  const gochannels =(<Navigate to={{ pathname: "/channels",state: {from:location }}}/>)
  const gohome = (<Navigate to={{pathname: "/", state: {from:location}}}/>)
  const gosettings = (<Navigate to={{pathname: "/",state: { from: location }}}/>)


  return (
    <div className="App" css={styles.root}>
      <Routes>
        <Route exact path="/" element={oauth ? (gochannels) : (<Login />)}/>
        <Route exact path="/settings" element={oauth ? (<Settings />) : (gosettings)}/>
        <Route path="/channels/*" element={oauth ? (<Main />) : (gohome)}/>
        <Route path="/Oups" element={<Oups />} />
      </Routes>
    </div>
  );
}
