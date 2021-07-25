import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@material-ui/styles';

import {
    Container,
    AppBar,
    CssBaseline,
    Typography,
    createMuiTheme,
    TextField,
    withStyles,
    Button,
    Radio,
    RadioGroup,
    FormLabel,
    FormControlLabel,
    FormControl
} from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const theme = createMuiTheme({
    // spacing: 60,
    palette: {
        type: 'dark'
    }
});

const styles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        // flexBasis: 980,
        width: '96%',
        margin: theme.spacing.unit * 2
    }
    // root: {
    //   width: 500,
    //   '& > * + *': {
    //     marginTop: theme.spacing(3),
    //   },
    // },
});

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://flicksickapp.com/">
                FlickSick
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const App = (props) => {
    const { classes } = props;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* <Typography style={{ marginTop: 50 }}>Text should be white, background should be dark</Typography> */}
            <Container fixed>
                <AppBar color="inherit">
                    <Typography variant="h6" style={{ textAlign: 'center', fontSize: 32, fontWeight: '600' }}>
                        Flick / Sick
                    </Typography>
                </AppBar>
                <div style={{ marginTop: 100 }} />
                <div>
                    <Typography variant="h5">Privacy Policy</Typography>
                    <Typography variant="body1" style={{ marginTop: 20 }}>
                        This privacy policy has been compiled to better serve all who are concerned with how their
                        'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law
                        and information security, is information that can be used on its own or with other information
                        to identify, contact, or locate a single person, or to identify an individual in context. Please
                        read our privacy policy carefully to get a clear understanding of how we collect, use and
                        protect.
                    </Typography>
                </div>
                <div style={{ marginTop: 30 }}>
                    <Typography variant="h5">
                        What personal information do we collect from the people that use our app?
                    </Typography>
                    <Typography variant="body1" style={{ marginTop: 20 }}>
                        When registering on our app, as appropriate, you may be asked to enter your name, email address,
                        Preferences or other details to help you with your experience.
                    </Typography>
                </div>
                <div style={{ marginTop: 30 }}>
                    <Typography variant="h5">How do we use your information?</Typography>
                    <Typography variant="body1" style={{ marginTop: 20 }}>
                        To personalize user's experience and to allow us to deliver the type of content and product
                        offerings in which you are most interested
                    </Typography>
                    <Typography variant="body1" style={{ marginTop: 10 }}>
                        To ask for ratings and reviews of services or products
                    </Typography>
                    <Typography variant="body1" style={{ marginTop: 10 }}>
                        To send notification of your interest
                    </Typography>
                </div>
                <div style={{ marginTop: 30 }}>
                    <Typography variant="h5">Do we share / sell your info to any one</Typography>
                    <Typography variant="body1" style={{ marginTop: 20 }}>
                        No. We do not sell, trade, or otherwise transfer to outside parties your personally identifiable
                        information.
                    </Typography>
                </div>
                <div style={{ marginTop: 30 }}>
                    <Typography variant="h5">How do we protect visitor information?</Typography>
                    <Typography variant="body1" style={{ marginTop: 20 }}>
                        We implement a variety of security measures when a user enters, submits, or accesses their
                        information to maintain the safety of your personal information.
                    </Typography>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
                <div style={{ marginBottom: 15 }} />
            </Container>
        </ThemeProvider>
    );
};

export default withStyles(styles)(App);