import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import './index.css';
import App from './App';
import { Provider as ContextProvider } from './Context';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto'
// Layout
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  BrowserRouter as Router,
} from "react-router-dom";

const theme = createTheme({

  palette: {
    type: 'dark',
    primary: {
      main: '#3d6a97',
    },
    secondary: {
      main: '#ffffff',
      dark: '#000000',
    },
    background: {
      default: '#18222d',
      paper: '#203140',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
    },
  
},
props: {
  MuiList: {
    dense: true,
  },
  MuiMenuItem: {
    dense: true,
  },
  MuiTable: {
    size: 'small',
  },
},
typography: {
  fontFamily: 'Lora',
  fontSize: 12,
  fontWeightLight: 300,
},
});

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <CookiesProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <App />
          </Router>
        </ThemeProvider>
      </CookiesProvider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
