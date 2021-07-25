import React, { useState } from 'react';
import { createMuiTheme } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useRoutes, navigate } from 'hookrouter';

const theme = createMuiTheme({
    spacing: 60,
    palette: {
        type: 'dark'
    }
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

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh'
    },
    image: {
        backgroundImage: 'url(  )',
        backgroundRepeat: 'no-repeat',
        backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 50
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        // marginTop: theme.spacing(1),
        alignItems: 'center',
        alignContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
        // marginTop: 50
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

const SignInSide = (props) => {
    const classes = useStyles();
    const [otpFlag, setOTPFlag] = useState(false);
    const [mobile, setMobile] = useState(null);

    const onChangeText = (e) => {
        const value = e.target.value;
        setMobile(value);
    };

    const next = () => {
        console.log('sign');
        if (mobile && mobile.length === 10) {
            setOTPFlag(true);
        }

        // navigate('/details');
    };

    const done = () => {
        navigate('/details');
    };

    const back = () => {
        setOTPFlag(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    {!otpFlag ? (
                        <div className={classes.paper}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                // required
                                fullWidth
                                id="mobile"
                                label="Mobile"
                                name="Mobile"
                                autoComplete="off"
                                autoFocus
                                onChange={(e) => onChangeText(e)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={() => next()}
                            >
                                NEXT
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <div style={{ marginTop: 20, marginLeft: 30 }} onClick={() => back()}>
                                <ArrowBackIosIcon />
                            </div>

                            <div className={classes.paper}>
                                <Typography style={{ fontWeight: '500', fontSize: 14 }}>
                                    OTP SENT TO MOBILE {mobile}
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    // required
                                    fullWidth
                                    name="otp"
                                    label="OTP"
                                    id="otp"
                                    autoComplete="off"
                                    autoFocus
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={() => done()}
                                >
                                    DONE
                                </Button>
                            </div>
                        </div>
                    )}
                    <div className={classes.paper} />
                    <Grid container />
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default SignInSide;