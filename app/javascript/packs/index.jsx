// Run this example by adding <%= javascript_pack_tag 'index' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import App from '../pages/App.jsx'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MomentUtils from 'material-ui-pickers/utils/moment-utils';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

// for ref.: https://github.com/mui-org/material-ui/issues/13175#issuecomment-428578344
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true
  }
});

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Route path="/" component={App} />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </Router>,
    document.body.appendChild(document.createElement('div'))
  )
})
