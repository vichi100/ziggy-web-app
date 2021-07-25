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
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

import { DropzoneDialog, DropzoneArea } from 'material-ui-dropzone';
import axios from 'axios';
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
    const [title, setTitle] = useState(null);
    const [releaseYear, setReleaseYear] = useState(null);
    const [genresDict, setGenresDict] = useState({});
    const [media, setMedia] = useState(null);
    const [selectedGenresArray, setSelectedGenresArray] = useState([]);
    const [values, setValues] = useState([]);
    const [openBackdropUpload, setOpenBackdropUpload] = useState(false);
    const [posterImage, setPosterImage] = useState(null);
    const [backdropImage, setBackdropImage] = useState(null);
    const [error, setError] = useState(null);
    const [movieAlreadyPresentFlag, setMovieAlreadyPresentFlag] = useState(false);
    const [movieDataFromDB, setMovieDataFromDB] = useState(null);
    const [open, setOpen] = useState(false);
    const [responseMessage, setResponseMessage] = useState(null);
    const [dishArray, setDishArray] = useState([]);


    const Dish = () => {
        return (


            <div style={{ border: '0.5px solid rgba(105,105,105, .3)', marginTop: 30, margin: 50 }}>
                <div style={{ position: 'relative', top: -15, left: 15 }}>
                    <Typography style={{ fontWeight: '600', fontSize: 20 }}>Dish</Typography>
                </div>


                <TextField
                    id="dish_name"
                    autoComplete="off"
                    className={classes.textField}
                    variant="outlined"
                    // type={this.state.showPassword ? 'text' : 'password'}
                    label="Dish Name"
                    value={title}
                    onChange={(e) => onChangeTitle(e)}
                />
                <TextField
                    multiline
                    id="details"
                    autoComplete="off"
                    className={classes.textField}
                    variant="outlined"
                    // type={this.state.showPassword ? 'text' : 'password'}
                    // InputLabelProps={{
                    //     shrink: values.overview ? true : false
                    // }}
                    label="Details / Ingredients"
                    value={values.overview}
                    onChange={(e) => handleInputChange(e)}
                />
                <TextField
                    id="landmark"
                    autoComplete="off"
                    className={classes.textField}
                    variant="outlined"
                    // type={this.state.showPassword ? 'text' : 'password'}
                    label="Landmark"
                    value={title}
                    onChange={(e) => onChangeTitle(e)}
                />
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <TextField
                        id="quantity"
                        autoComplete="off"
                        className={classes.textField}
                        variant="outlined"
                        // type={this.state.showPassword ? 'text' : 'password'}
                        label="Quantity"
                        // InputLabelProps={{
                        //     shrink: values.runtime ? true : false
                        // }}
                        type={'tel'}
                        value={values.runtime}
                        style={{ width: 300 }}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <TextField
                        id="price"
                        autoComplete="off"
                        className={classes.textField}
                        variant="outlined"
                        type={'tel'}
                        // type={this.state.showPassword ? 'text' : 'password'}
                        label="Price"
                        value={releaseYear}
                        style={{ width: 300 }}
                        onChange={(e) => onChangeReleaseYear(e)}
                    />

                </div>

                <div style={{ flex: 1, flexDirection: "column" }}>

                    <div style={{ display: 'flex', flexDirection: 'row', margin: 15 }}>
                        <Typography style={{ textAlign: 'center', marginTop: 30 }}>Is Veg ? </Typography>
                        <div style={{ marginLeft: 50 }}>
                            <RadioGroup
                                aria-label="mediaType"
                                name="mediaType"
                                value={media}
                                onChange={selectMediaType}
                            >
                                <FormControlLabel
                                    value="yes"
                                    control={<Radio checked={media && media === 'movie' ? true : false} />}
                                    label="Yes"
                                />
                                <FormControlLabel
                                    value="no"
                                    control={<Radio checked={media && media === 'series' ? true : false} />}
                                    label="No"
                                />
                            </RadioGroup>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', margin: 10 }}>
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
                            {backdropImage ? backdropImage[0].name : null}
                        </Typography>
                    </div>

                </div>
            </div>


        )
    };

    const addDish = () => {
        const x = [...dishArray, <Dish />];
        setDishArray(x);
    }



    const handleToClose = (event, reason) => {
        console.log(reason);
        if ('clickaway' === reason) return;
        setOpen(false);
        clearState();
    };

    const clearState = () => {
        window.location.reload();
    };

    const handleInputChange = (e) => {
        setError(null);
        const { id, value } = e.target;
        console.log(id, value);
        setValues({
            ...values,
            [id]: value
        });
    };





    const handleBackdropClose = () => {
        setOpenBackdropUpload(false);
    };



    const handleBackdropImageSave = (file) => {
        setError(null);
        // console.log(file[0].name);
        setOpenBackdropUpload(false);
        setBackdropImage(file);
    };



    const handleBackdropOpen = () => {
        setOpenBackdropUpload(true);
    };

    const onSave = () => {
        console.log('title: ', title);

    };

    const selectMediaType = (event, valuesX) => {
        setError(null);
        console.log('selectMediaType ', valuesX);
        setMedia(valuesX);
    };

    const onChangeTitle = (e) => {
        const titleX = e.target.value;
        setTitle(titleX);
        // searchMovie();
    };

    const onChangeReleaseYear = (e) => {
        const year = e.target.value;
        setReleaseYear(year);
        // searchMovie();
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
                        id="title"
                        autoComplete="off"
                        className={classes.textField}
                        variant="outlined"
                        // type={this.state.showPassword ? 'text' : 'password'}
                        label="Restaurant Name"
                        value={title}
                        onChange={(e) => onChangeTitle(e)}
                    />
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
                        value={values.overview}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <TextField
                        id="landmark"
                        autoComplete="off"
                        className={classes.textField}
                        variant="outlined"
                        // type={this.state.showPassword ? 'text' : 'password'}
                        label="Landmark"
                        value={title}
                        onChange={(e) => onChangeTitle(e)}
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
                            value={values.runtime}
                            style={{ width: 300 }}
                            onChange={(e) => handleInputChange(e)}
                        />
                        <TextField
                            id="pin"
                            autoComplete="off"
                            className={classes.textField}
                            variant="outlined"
                            type={'tel'}
                            // type={this.state.showPassword ? 'text' : 'password'}
                            label="Pin"
                            value={releaseYear}
                            style={{ width: 300 }}
                            onChange={(e) => onChangeReleaseYear(e)}
                        />
                        <TextField
                            id="state"
                            autoComplete="off"
                            className={classes.textField}
                            variant="outlined"
                            type={'tel'}
                            // type={this.state.showPassword ? 'text' : 'password'}
                            label="State"
                            value={releaseYear}
                            style={{ width: 300 }}
                            onChange={(e) => onChangeReleaseYear(e)}
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
                            value={values.runtime}
                            style={{ width: 300 }}
                            onChange={(e) => handleInputChange(e)}
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
                            value={values.runtime}
                            style={{ width: 300 }}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', margin: 15 }}>
                        <Typography style={{ textAlign: 'center', marginTop: 30 }}>Is Pure Veg ? </Typography>
                        <div style={{ marginLeft: 50 }}>
                            <RadioGroup
                                aria-label="mediaType"
                                name="mediaType"
                                value={media}
                                onChange={selectMediaType}
                            >
                                <FormControlLabel
                                    value="yes"
                                    control={<Radio checked={media && media === 'movie' ? true : false} />}
                                    label="Yes"
                                />
                                <FormControlLabel
                                    value="no"
                                    control={<Radio checked={media && media === 'series' ? true : false} />}
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
                                {backdropImage ? backdropImage[0].name : null}
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
                            marginTop: 20
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
                {/* </div> */}



                <div style={{ border: '0.5px solid rgba(105,105,105, .3)', marginTop: 50 }}>
                    <div style={{ position: 'relative', top: -15, left: 15 }}>
                        <Typography style={{ fontWeight: '600', fontSize: 20 }}>Menu</Typography>
                    </div>

                    <div style={{ border: '0.5px solid rgba(105,105,105, .3)', marginTop: 30, margin: 50 }}>
                        <div style={{ position: 'relative', top: -15, left: 15 }}>
                            <Typography style={{ fontWeight: '600', fontSize: 20 }}>Dish</Typography>
                        </div>


                        <TextField
                            id="dish_name"
                            autoComplete="off"
                            className={classes.textField}
                            variant="outlined"
                            // type={this.state.showPassword ? 'text' : 'password'}
                            label="Dish Name"
                            value={title}
                            onChange={(e) => onChangeTitle(e)}
                        />
                        <TextField
                            multiline
                            id="details"
                            autoComplete="off"
                            className={classes.textField}
                            variant="outlined"
                            // type={this.state.showPassword ? 'text' : 'password'}
                            // InputLabelProps={{
                            //     shrink: values.overview ? true : false
                            // }}
                            label="Details / Ingredients"
                            value={values.overview}
                            onChange={(e) => handleInputChange(e)}
                        />
                        <TextField
                            id="landmark"
                            autoComplete="off"
                            className={classes.textField}
                            variant="outlined"
                            // type={this.state.showPassword ? 'text' : 'password'}
                            label="Landmark"
                            value={title}
                            onChange={(e) => onChangeTitle(e)}
                        />
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <TextField
                                id="quantity"
                                autoComplete="off"
                                className={classes.textField}
                                variant="outlined"
                                // type={this.state.showPassword ? 'text' : 'password'}
                                label="Quantity"
                                // InputLabelProps={{
                                //     shrink: values.runtime ? true : false
                                // }}
                                type={'tel'}
                                value={values.runtime}
                                style={{ width: 300 }}
                                onChange={(e) => handleInputChange(e)}
                            />
                            <TextField
                                id="price"
                                autoComplete="off"
                                className={classes.textField}
                                variant="outlined"
                                type={'tel'}
                                // type={this.state.showPassword ? 'text' : 'password'}
                                label="Price"
                                value={releaseYear}
                                style={{ width: 300 }}
                                onChange={(e) => onChangeReleaseYear(e)}
                            />

                        </div>

                        <div style={{ flex: 1, flexDirection: "column" }}>

                            <div style={{ display: 'flex', flexDirection: 'row', margin: 15 }}>
                                <Typography style={{ textAlign: 'center', marginTop: 30 }}>Is Veg ? </Typography>
                                <div style={{ marginLeft: 50 }}>
                                    <RadioGroup
                                        aria-label="mediaType"
                                        name="mediaType"
                                        value={media}
                                        onChange={selectMediaType}
                                    >
                                        <FormControlLabel
                                            value="yes"
                                            control={<Radio checked={media && media === 'movie' ? true : false} />}
                                            label="Yes"
                                        />
                                        <FormControlLabel
                                            value="no"
                                            control={<Radio checked={media && media === 'series' ? true : false} />}
                                            label="No"
                                        />
                                    </RadioGroup>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', margin: 10 }}>
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
                                    {backdropImage ? backdropImage[0].name : null}
                                </Typography>
                            </div>

                        </div>
                    </div>

                    {dishArray}

                    <div
                        style={{
                            flexDirection: 'row',
                            margin: 15,
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
                                marginTop: 20
                            }}
                            onClick={() => addDish()}
                        >
                            ADD MORE DISH
                        </Button>
                    </div>

                </div>



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

export default withStyles(styles)(App);