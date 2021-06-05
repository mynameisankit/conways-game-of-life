import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider as ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from './styles/theme';

import App from './App';

ReactDOM.render(
    <React.Fragment>
        <Helmet>
            <title>Conway's Game Of Life</title>
            <meta name="theme-color" content={theme.palette.primary.main} />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
        </Helmet>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <App />
            </Router>
        </ThemeProvider>
    </React.Fragment>,
    document.getElementById('root')
);