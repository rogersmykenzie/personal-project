import React, { Component } from 'react';

import './App.css';
import routes from './routes';
import NavBar from './components/NavBar/NavBar';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import {green, pink, purple, blue, amber, yellow, red, brown, orange, grey, } from '@material-ui/core/colors'

const colors = [green, pink, purple, blue, yellow, amber, red, brown, orange, grey]

const getRandomColor = () => {
  return Math.floor(Math.random() * 10)
}

const theme = createMuiTheme({
    palette: {
        // primary: colors[getRandomColor()],
        primary: {
          main: '#000000',
        },
        secondary: {
          main: '#ff8000'
        }
    },
    typography: {
      fontFamily: "'Volkhov', serif",
      textTransform: "none",
    }
})

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
            <NavBar />
                {routes}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
