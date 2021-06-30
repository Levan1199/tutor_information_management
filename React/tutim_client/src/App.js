

import React, { Component } from 'react';
import Main from './components/MainComponent';
// import './App.css';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/configureStore';

import {ThemeProvider} from '@material-ui/core/styles';
import theme from './shared/theme';
//test


const store = ConfigureStore();  

class App extends Component{
  render(){
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <div>      
              <Main/>
              
            </div>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
