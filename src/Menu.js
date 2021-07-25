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
import MovieList from './MovieList';
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



const Menu = (props) => {
    const { classes } = props;
    const [dishName, setDishName] = useState(null);
    const [details, setDetails] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [price, setPrice] = useState(null);
    const [isVeg, setIsVeg] = useState(null);
    const [image, setImage] = useState(null);
    const [dishArray, setDishArray] = useState([])
    const [error, setError] = useState(null);


    const addDish = () => {
        if (dishName === null || dishName.trim().length === 0) {
            setError("Dish name is missing");
            return
        }
        if (quantity === null || quantity.trim().length === 0) {
            setError("Quantity is missing")
            return
        }
        if (price === null || price.trim().length === 0) {
            setError("Price is missing")
            return
        }
        if (isVeg === null) {
            setError("Is Veg value missing")
            return
        }

        const dishObj = {
            dish_name: dishName,
            details: details,
            price: price,
            quantity: quantity,
            is_veg: isVeg, // yes , no
        }
        dishArray.push(dishObj)
        setDishArray([...dishArray]);
        clearState();
    }

    const clearState = () => {
        setDishName('');
        setDetails('');
        setQuantity('');
        setPrice('');
        setIsVeg('');
        setImage('');
        setError('');
    };

    const selectDishType = (event, valuesX) => {
        setError(null);
        console.log('selectMediaType ', valuesX);
        setIsVeg(valuesX)

    };

    const handleBackdropOpen = () => {

    }

    const setSelectedDish = (dish) => {
        setDishName(dish.dish_name);
        setDetails(dish.details);
        setQuantity(dish.quantity);
        setPrice(dish.price);
        setIsVeg(dish.is_veg);
        setImage(dish.image);
        setError('');
    }

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

                <div
                    style={{
                        flexDirection: 'row',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center'
                        // alignItems: 'center'
                    }}
                >
                    <div style={{ border: '0.5px solid rgba(105,105,105, .3)', height: 500, marginRight: 10 }}>
                        <div style={{ position: 'relative', top: -15, left: 15 }}>
                            <Typography style={{ fontWeight: '600', fontSize: 20 }}>Menu</Typography>
                        </div>
                        <MovieList
                            dishArray={dishArray}
                            setSelectedDish={(movieData) => setSelectedDish(movieData)}
                            classes={{ listItemClicked: 'clickedItemStyle', listItemNotClicked: '' }}
                        />
                    </div>

                    <div style={{ border: '0.5px solid rgba(105,105,105, .3)', marginLeft: 20 }}>
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
                            value={dishName}
                            onChange={(e) => setDishName(e.target.value)}
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
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
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
                                value={quantity}
                                style={{ width: 300 }}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                            <TextField
                                id="price"
                                autoComplete="off"
                                className={classes.textField}
                                variant="outlined"
                                type={'tel'}
                                // type={this.state.showPassword ? 'text' : 'password'}
                                label="Price"
                                value={price}
                                style={{ width: 300 }}
                                onChange={(e) => setPrice(e.target.value)}
                            />

                        </div>
                        <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                            <Typography style={{ textAlign: 'center', marginRight: 20, fontSize: 12, color: "#00BFFF" }}>Add More Quantity / Price</Typography>
                        </div>


                        <div style={{ flex: 1, flexDirection: "column" }}>

                            <div style={{ display: 'flex', flexDirection: 'row', margin: 15 }}>
                                <Typography style={{ textAlign: 'center', marginTop: 30 }}>Is Veg ? </Typography>
                                <div style={{ marginLeft: 50 }}>
                                    <RadioGroup
                                        aria-label="mediaType"
                                        name="mediaType"
                                        value={isVeg}
                                        onChange={selectDishType}
                                    >
                                        <FormControlLabel
                                            value="yes"
                                            control={<Radio checked={isVeg && isVeg === 'yes' ? true : false} />}
                                            label="Yes"
                                        />
                                        <FormControlLabel
                                            value="no"
                                            control={<Radio checked={isVeg && isVeg === 'no' ? true : false} />}
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
                                    {image ? image[0].name : null}
                                </Typography>
                            </div>

                        </div>
                    </div>




                </div>

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
                        onClick={() => addDish()}
                    >
                        ADD MORE DISH
                    </Button>
                </div>

            </Container>

        </ThemeProvider>
    );
};

export default withStyles(styles)(Menu);