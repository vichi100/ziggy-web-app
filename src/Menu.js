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

import { connect } from 'react-redux';
import { setDishArray, setClickedItem } from './reducer/Action';
//https://github.com/Yuvaleros/material-ui-dropzone

import { SERVER_URL } from "./Constant"

// const SERVER_URL = 'http://flicksickserver.com';
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
    const [price, setPrice] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [priceDetails, setPriceDetails] = useState([{

        quantity: '',// full, half, portion, 1kg, 1/2kg
        price: ''
    }]);
    const [isVeg, setIsVeg] = useState(null);
    const [image, setImage] = useState(null);
    // const [dishArray, setDishArray] = useState([])
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);

    // useEffect(()=>{
    //     if(props.dishArray && props.dishArray.length > 0)
    // })

    const onChangeQuntity = (quantityX) => {
        var isAbort = false;
        priceDetails.map(item => {
            if (item.quantity === quantityX) {
                setError("Quantity already exist");
                setOpen(true);
                isAbort = true;
            }
        })
        if (isAbort) {
            return;
        }

        priceDetails.map(item => {
            if (item.quantity === '') {
                item.quantity = quantityX;

            }
        })

        setQuantity(quantityX);

    }

    const onChangePrice = (priceX) => {
        if (priceX && priceX.trim().length === 0) {
            setError("Price is missing");
            setOpen(true);
            return;
        }
        console.log('onChangePrice priceDetails: ', priceDetails)
        var isPriceSet = false
        priceDetails.map(item => {
            if (item.price === '') {
                item.price = priceX;
                isPriceSet = true;
            }
        })

        if (!isPriceSet) {
            setError("Quntity is missing");
            setOpen(true);
            return;
        }
        setPrice(priceX)
    }


    const removePriceDetails = (e, itemX) => {
        console.log("itemX: ", itemX)
        const arr = priceDetails.filter(function (item) {
            return item.price !== itemX.price && item.quantity !== itemX.quantity
        });
        if (arr && arr.length === 0) {
            const y = {

                quantity: '',// full, half, portion, 1kg, 1/2kg
                price: ''
            }
            arr.push(y);
        }
        setPriceDetails([...arr])
    }

    const addPriceDetails = () => {
        console.log('addPriceDetails1')
        if (quantity && quantity.trim().length === 0) {
            setError("Quantity is missing");
            return
        }
        if (price && price.trim().length === 0) {
            setError("Price is missing");
            return
        }
        console.log('addPriceDetails2')
        const arr = priceDetails.filter(function (item) {
            return item.price !== '' && item.quantity !== ''
        })

        // const x = {
        //     quantity: quantity,// full, half, portion, 1kg, 1/2kg
        //     price: price,
        // }

        // arr.push(x);
        const y = {

            quantity: '',// full, half, portion, 1kg, 1/2kg
            price: ''
        }
        setPrice('');
        setQuantity('');
        arr.push(y);
        setPriceDetails([...arr])

    }

    const addToMenu = () => {
        if (dishName === null || dishName.trim().length === 0) {
            setError("Dish name is missing");
            setOpen(true);
            return
        }

        if (isVeg === null) {
            setError("Is Veg value missing")
            setOpen(true);
            return
        }
        var isAnyPriceDetailsValueMissing = false
        priceDetails.map(item => {
            if (item.price === null || item.price.trim() === '') {
                setError("Price is missing");
                isAnyPriceDetailsValueMissing = true
                return
            }
            if (item.quantity === null || item.quantity.trim() === '') {
                setError("Quntity is missing");
                isAnyPriceDetailsValueMissing = true;
                return
            }
        })

        if (isAnyPriceDetailsValueMissing) {
            setOpen(true);
            return
        }

        console.log("priceDetails: ", priceDetails)

        const dishObj = {
            dish_name: dishName,
            details: details,
            price_details: priceDetails,
            is_veg: isVeg, // yes , no
        }
        // if dish name is alredy in menu the update dish values
        var isUpdated = false;
        props.dishArray.map(item => {
            if (item.dish_name === dishName) {
                item.details = details;
                item.price_details = priceDetails;
                item.is_veg = isVeg
                isUpdated = true;
            }
        })
        if (isUpdated) {
            clearState();
            return
        }
        props.dishArray.push(dishObj)
        props.setDishArray([...props.dishArray]);
        clearState();
    }

    const clearState = () => {
        setDishName('');
        setDetails('');
        setQuantity('');
        setPrice('');
        setPriceDetails([{

            quantity: '',// full, half, portion, 1kg, 1/2kg
            price: ''
        }]);
        setIsVeg('');
        setImage('');
        setError('');
        setOpen(false);
        props.setClickedItem(null)
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
        setPriceDetails(dish.price_details)
        setIsVeg(dish.is_veg);
        setImage(dish.image);
        setError('');
    }

    const setDishNameX = (name) => {
        var isDishAlreadyInMenu = false;
        setDishName(name);
        props.dishArray.map(item => {
            if (item.dish_name === name) {
                setError("Dish already exist");
                isDishAlreadyInMenu = true;
                setOpen(true);
                return;
            }
        });
        if (isDishAlreadyInMenu) {
            return;
        }
        setOpen(false);

    }

    const handleToClose = (event, reason) => {
        console.log(reason);
        if ('clickaway' === reason) return;
        setOpen(false);

    };

    const saveMenu = () => {
        console.log("saveMenu")
        const obj = {
            restaurant_details: props.restaurantDetails,
            menu_with_dish_list: props.dishArray
        };
        axios(SERVER_URL + '/addNewRestaurant', {
            method: 'post',
            // headers: {
            // 	'Content-type': 'Application/json',
            // 	// 'Content-type': 'application/x-www-form-urlencoded',
            // 	Accept: 'Application/json'
            // },
            data: obj
        })
            .then((res) => {
                const movieArr = res.data;
                console.log('movieArr', movieArr);
            })
            .catch((err) => {
                console.log(err);
            });
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
                    <div style={{ border: '0.5px solid rgba(105,105,105, .3)', height: 500, marginRight: 10, }}>
                        <div style={{ position: 'relative', top: -15, left: 15 }}>
                            <Typography style={{ fontWeight: '600', fontSize: 20 }}>Menu</Typography>
                        </div>
                        {props.dishArray.length > 0 ? <MovieList
                            // dishArray={props.dishArray}
                            setSelectedDish={(movieData) => setSelectedDish(movieData)}
                            classes={{ listItemClicked: 'clickedItemStyle', listItemNotClicked: '' }}
                        /> :
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Typography style={{ fontWeight: '600', fontSize: 16, padding: 50 }}>No dish</Typography>
                            </div>}
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
                            onChange={(e) => setDishNameX(e.target.value)}
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

                        {priceDetails && priceDetails.length > 0 ?
                            priceDetails.map(item => {
                                return (

                                    item.price && item.price.length > 0 ?
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                                            <TextField
                                                id="quantity"
                                                autoComplete="off"
                                                className={classes.textField}
                                                variant="outlined"
                                                // type={this.state.showPassword ? 'text' : 'password'}
                                                label="Quantity"
                                                InputLabelProps={{
                                                    shrink: item.quantity ? true : false
                                                }}
                                                type={'tel'}
                                                // defaultValue={item.quantity}
                                                value={item.quantity}
                                                style={{ width: 300 }}
                                            // onChange={(e) => setQuantity(e.target.value)}
                                            />
                                            <TextField
                                                id="price"
                                                autoComplete="off"
                                                className={classes.textField}
                                                variant="outlined"
                                                type={'tel'}
                                                // type={this.state.showPassword ? 'text' : 'password'}
                                                label="Price"
                                                InputLabelProps={{
                                                    shrink: item.price ? true : false
                                                }}
                                                // defaultValue={item.price}
                                                value={item.price}
                                                style={{ width: 300 }}
                                            // onChange={(e) => setPrice(e.target.value)}
                                            />

                                            {priceDetails && priceDetails.length > 1 ? <div style={{ display: 'flex', justifyContent: "flex-end", }} onClick={(e) => removePriceDetails(e, item)}>
                                                <Typography style={{ textAlign: 'center', marginRight: 20, fontSize: 14, color: "rgb(250,128,114)", cursor: "pointer" }}>X</Typography>
                                            </div> : null}

                                        </div>
                                        : <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
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
                                                onChange={(e) => onChangeQuntity(e.target.value)}
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
                                                onChange={(e) => onChangePrice(e.target.value)}
                                            />

                                            {priceDetails && priceDetails.length > 1 ? <div style={{ display: 'flex', justifyContent: "flex-end", }} onClick={(e) => removePriceDetails(e, item)}>
                                                <Typography style={{ textAlign: 'center', marginRight: 20, fontSize: 14, color: "rgb(250,128,114)", cursor: "pointer" }}>X</Typography>
                                            </div> : null}

                                        </div>
                                )
                            })

                            : null}
                        <div style={{ display: 'flex', justifyContent: "flex-end" }} onClick={() => addPriceDetails()}>
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
                        justifyContent: "center",
                        alignContent: 'center',
                        // alignItems: 'flex-end'
                    }}
                >

                    <Button
                        style={{
                            border: '0.3px solid rgba(102,205,170, .9)',
                            height: 45,
                            width: 200,
                            // marginLeft: 90,
                            marginTop: 20
                        }}
                        onClick={() => saveMenu()}
                    >
                        SAVE MENU
                    </Button>

                    <Button
                        style={{
                            border: '0.3px solid rgba(102,205,170, .9)',
                            height: 45,
                            width: 200,
                            marginLeft: 90,
                            marginTop: 20
                        }}
                        onClick={() => clearState()}
                    >
                        CLEAR
                    </Button>
                    <Button
                        style={{
                            border: '0.3px solid rgba(102,205,170, .9)',
                            height: 45,
                            width: 200,
                            marginLeft: 90,
                            marginTop: 20
                        }}
                        onClick={() => addToMenu()}
                    >
                        ADD TO MENU
                    </Button>
                </div>

            </Container>

            <Snackbar
                anchorOrigin={{
                    horizontal: 'left',
                    vertical: 'bottom'
                }}
                open={open}
                autoHideDuration={null}
                message={error}
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
    setClickedItem
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Menu));

// export default withStyles(styles)(Menu);