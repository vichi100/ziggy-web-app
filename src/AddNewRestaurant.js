import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { navigate } from "hookrouter";

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
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

import { DropzoneDialog, DropzoneArea } from 'material-ui-dropzone';
import axios from 'axios';

import { connect } from 'react-redux';
import { setDishArray, setClickedItem, setRestaurantDetails } from './reducer/Action';

//https://github.com/Yuvaleros/material-ui-dropzone

const SERVER_URL = 'http://flicksickserver.com';
// const SERVER_URL_PROD = 'http://flicksickapp.com';
// const SERVER_URL_DEV = 'http://192.168.0.101:3050';

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



const App = (props) => {
    const { classes } = props;
    const [name, setName] = useState(null);
    const [speciality, setSpeciality] = useState(null);
    const [mobile, setMobile] = useState(null);
    const [otherMobile, setOtherMobile] = useState(null);
    const [address, setAddress] = useState(null);
    const [landmark, setLandMark] = useState(null);
    const [city, setCity] = useState(null);
    const [pincode, setPincode] = useState(null);
    const [stateX, setStateX] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [isPureVeg, setIsPureVeg] = useState(null);
    const [openBackdropUpload, setOpenBackdropUpload] = useState(false);
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [responseMessage, setResponseMessage] = useState(null);

    useEffect(() => {
        console.log("back");
        if (props.restaurantDetails) {
            console.log("back: ", props.restaurantDetails);
            setName(props.restaurantDetails.name);
            setSpeciality(props.restaurantDetails.speciality);
            setMobile(props.restaurantDetails.mobile);
            setOtherMobile(props.restaurantDetails.otherMobile)
            setAddress(props.restaurantDetails.address);
            setLandMark(props.restaurantDetails.landmark);
            setCity(props.restaurantDetails.city);
            setPincode(props.restaurantDetails.pincode);
            setStateX(props.restaurantDetails.state);
            setLongitude(props.restaurantDetails.longitude);
            setLatitude(props.restaurantDetails.latitude);
            setIsPureVeg(props.restaurantDetails.is_pure_veg);
            setImage(props.restaurantDetails.image)
        }
    }, [])


    const handleToClose = (event, reason) => {
        console.log(reason);
        if ('clickaway' === reason) return;
        setOpen(false);
        clearState();
    };

    const clearState = () => {
        window.location.reload();
    };

    const handleBackdropClose = () => {
        setOpenBackdropUpload(false);
    };

    const handleBackdropImageSave = (file) => {
        setError(null);
        // console.log(file[0].name);
        setOpenBackdropUpload(false);
        setImage(file);
    };


    const handleBackdropOpen = () => {
        setOpenBackdropUpload(true);
    };

    const onSave = () => {
        navigate('/menu')
        const x = {
            name: name,
            speciality: speciality,
            mobile: mobile,
            other_mobile: otherMobile,
            address: address,
            landmark: landmark,
            city: city,
            pincode: pincode,
            state: stateX,
            longitude: longitude,
            latitude: latitude,
            is_pure_veg: isPureVeg,
            image: image
        }
        props.setRestaurantDetails(x)

    };

    const selectMediaType = (event, valuesX) => {
        setIsPureVeg(valuesX);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* <Typography style={{ marginTop: 50 }}>Text should be white, background should be dark</Typography> */}
            <Container fixed>
                <AppBar color="inherit">
                    <Typography variant="h6" style={{ textAlign: 'center', fontSize: 32, fontWeight: '600' }}>
                        Ziggy
                    </Typography>
                </AppBar>
                <div style={{ marginTop: 100 }} />

                <div style={{ border: '0.5px solid rgba(105,105,105, .3)' }}>
                    <div style={{ position: 'relative', top: -15, left: 15 }}>
                        <Typography style={{ fontWeight: '600', fontSize: 20 }}>Restaurant Details</Typography>
                    </div>
                    <TextField
                        id="name"
                        autoComplete="off"
                        className={classes.textField}
                        variant="outlined"
                        // type={this.state.showPassword ? 'text' : 'password'}
                        label="Restaurant Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        id="speciality"
                        autoComplete="off"
                        className={classes.textField}
                        variant="outlined"
                        // type={this.state.showPassword ? 'text' : 'password'}
                        label="Speciality"
                        value={speciality}
                        onChange={(e) => setSpeciality(e.target.value)}
                    />
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField
                            id="primary_mobile"
                            autoComplete="off"
                            className={classes.textField}
                            variant="outlined"
                            // type={this.state.showPassword ? 'text' : 'password'}
                            label="Primary Mobile"
                            // InputLabelProps={{
                            //     shrink: values.runtime ? true : false
                            // }}
                            type={'tel'}
                            value={mobile}
                            style={{ width: 200 }}
                            onChange={(e) => setMobile(e.target.value)}
                        />
                        <TextField
                            id="other_mobile"
                            autoComplete="off"
                            className={classes.textField}
                            variant="outlined"
                            // type={this.state.showPassword ? 'text' : 'password'}
                            label="Other Mobiles"
                            // InputLabelProps={{
                            //     shrink: values.runtime ? true : false
                            // }}
                            type={'tel'}
                            value={otherMobile}
                            style={{ width: 400 }}
                            onChange={(e) => setOtherMobile(e.target.value)}
                        />
                    </div>
                    <TextField
                        multiline
                        id="address"
                        autoComplete="off"
                        className={classes.textField}
                        variant="outlined"
                        // type={this.state.showPassword ? 'text' : 'password'}
                        // InputLabelProps={{
                        //     shrink: values.overview ? true : false
                        // }}
                        label="Address (House No, Building, Street, Area)"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <TextField
                        id="landmark"
                        autoComplete="off"
                        className={classes.textField}
                        variant="outlined"
                        // type={this.state.showPassword ? 'text' : 'password'}
                        label="Landmark"
                        value={landmark}
                        onChange={(e) => setLandMark(e.target.value)}
                    />
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField
                            id="city"
                            autoComplete="off"
                            className={classes.textField}
                            variant="outlined"
                            // type={this.state.showPassword ? 'text' : 'password'}
                            label="City"
                            // InputLabelProps={{
                            //     shrink: values.runtime ? true : false
                            // }}
                            type={'tel'}
                            value={city}
                            style={{ width: 300 }}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <TextField
                            id="pin"
                            autoComplete="off"
                            className={classes.textField}
                            variant="outlined"
                            type={'tel'}
                            // type={this.state.showPassword ? 'text' : 'password'}
                            label="Pin"
                            value={pincode}
                            style={{ width: 300 }}
                            onChange={(e) => setPincode(e.target.value)}
                        />
                        <TextField
                            id="state"
                            autoComplete="off"
                            className={classes.textField}
                            variant="outlined"
                            type={'tel'}
                            // type={this.state.showPassword ? 'text' : 'password'}
                            label="State"
                            value={stateX}
                            style={{ width: 300 }}
                            onChange={(e) => setStateX(e.target.value)}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField
                            id="longitude"
                            autoComplete="off"
                            className={classes.textField}
                            variant="outlined"
                            // type={this.state.showPassword ? 'text' : 'password'}
                            label="Longitude"
                            // InputLabelProps={{
                            //     shrink: values.runtime ? true : false
                            // }}
                            type={'tel'}
                            value={longitude}
                            style={{ width: 300 }}
                            onChange={(e) => setLongitude(e.target.value)}
                        />
                        <TextField
                            id="latitude"
                            autoComplete="off"
                            className={classes.textField}
                            variant="outlined"
                            // type={this.state.showPassword ? 'text' : 'password'}
                            label="Latitude"
                            // InputLabelProps={{
                            //     shrink: values.runtime ? true : false
                            // }}
                            type={'tel'}
                            value={latitude}
                            style={{ width: 300 }}
                            onChange={(e) => setLatitude(e.target.value)}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', margin: 15 }}>
                        <Typography style={{ textAlign: 'center', marginTop: 30 }}>Is Pure Veg Restaurant ? </Typography>
                        <div style={{ marginLeft: 50 }}>
                            <RadioGroup
                                aria-label="mediaType"
                                name="mediaType"
                                value={isPureVeg}
                                onChange={selectMediaType}
                            >
                                <FormControlLabel
                                    value="yes"
                                    control={<Radio checked={isPureVeg && isPureVeg === 'yes' ? true : false} />}
                                    label="Yes"
                                />
                                <FormControlLabel
                                    value="no"
                                    control={<Radio checked={isPureVeg && isPureVeg === 'no' ? true : false} />}
                                    label="No"
                                />
                            </RadioGroup>
                        </div>
                    </div>



                </div>


                <div style={{ border: '0.3px solid rgba(105,105,105, .3)', marginTop: 30, marginBottom: 20 }}>
                    <div style={{ position: 'relative', top: -15, left: 15 }}>
                        <Typography style={{ fontWeight: '600', fontSize: 20 }}>Upload Restaurant Image</Typography>
                    </div>

                    <div style={{ marginTop: 30, marginLeft: 15, marginBottom: 15 }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Button
                                style={{ border: '0.3px solid rgba(105,105,105, .9)' }}
                                onClick={() => handleBackdropOpen()}
                            >
                                Add Image
                            </Button>
                            <Typography
                                style={{
                                    fontWeight: '500',
                                    fontSize: 16,
                                    marginLeft: 50,
                                    color: 'rgba(222,184,135, .9)'
                                }}
                            >
                                {image ? image[0].name : null}
                            </Typography>
                        </div>

                        <DropzoneDialog
                            open={openBackdropUpload}
                            onSave={handleBackdropImageSave}
                            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                            showPreviews={true}
                            maxFileSize={5000000}
                            onClose={handleBackdropClose}
                            cancelButtonText={'Cancel'}
                            submitButtonText={'submit'}
                            showFileNamesInPreview={true}
                            dialogTitle={'dialogTitle'}
                            dropzoneText={'dropzoneText'}
                        />
                    </div>


                </div>

                {/* <div style={{ position: "absolute", right: 90 }}> */}
                <div
                    style={{
                        flexDirection: 'row',
                        // margin: 15,
                        display: 'flex',
                        justifyContent: "flex-end"
                        // alignContent: 'flex-end',
                        // alignItems: 'flex-end'
                    }}
                >

                    <Button
                        style={{
                            border: '0.3px solid rgba(102,205,170, .9)',
                            height: 45,
                            width: 200,
                            marginLeft: 90,
                            marginTop: 20,
                            marginBottom: 15
                        }}
                        onClick={() => onSave()}
                    >
                        SAVE RESTAURNT
                    </Button>
                </div>
                <Typography
                    style={{
                        fontWeight: '500',
                        fontSize: 16,
                        marginLeft: 50,
                        color: 'red'
                    }}
                >
                    {error ? error : null}
                </Typography>


            </Container>
            <Snackbar
                anchorOrigin={{
                    horizontal: 'left',
                    vertical: 'bottom'
                }}
                open={open}
                autoHideDuration={null}
                message={responseMessage}
                onClose={handleToClose}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleToClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </ThemeProvider>
    );
};

const mapStateToProps = (state) => ({
    dishArray: state.AppReducer.dishArray,
    restaurantDetails: state.AppReducer.restaurantDetails
});

const mapDispatchToProps = {
    setDishArray,
    setClickedItem,
    setRestaurantDetails
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));

// export default withStyles(styles)(App);