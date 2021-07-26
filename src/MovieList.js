import React, { Component, useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import { connect } from 'react-redux';
import { setDishArray, setClickedItem } from './reducer/Action';

const SERVER_URL = 'http://flicksickserver.com';
// const SERVER_URL_PROD = 'http://flicksickserver.com';
// const SERVER_URL_DEV = 'http://192.168.0.101:3050';

// https://codesandbox.io/s/material-demo-forked-tw56s?file=/demo.js



const MovieList = (props) => {
	const { classes, setSelectedDish } = props;
	// const [clickedItem, setClickedItem] = useState(null);
	const [listItems, setListItems] = useState([]);
	const [trendingMovieList, setTrendingMovieList] = useState([]);

	useEffect(() => {
		getTrendingMovie();
	}, []);

	const getTrendingMovie = () => {
		const obj = {
			id: '-1'
		};
		axios(SERVER_URL + '/getTrendingMovie', {
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
				// console.log('movieArr', movieArr);
				setTrendingMovieList(movieArr);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleClick = (item) => {
		console.log('item', item);
		props.setClickedItem(item.dish_name);
		setSelectedDish(item);
		// this.setState({
		// 	clickedItem: item.id
		// });
	};

	useEffect(

		() => {
			console.log("dishArray: ", props.dishArray)

			initList();

		},
		[props.clickedItem, props.dishArray]
	);

	const removeFromMenu = (itemX) => {
		console.log('removeFromMenu item: ', itemX);
		const arr = props.dishArray.filter(function (item) {
			return item.dish_name !== itemX.dish_name
		})
		console.log('removeFromMenu arr: ', arr);
		props.setDishArray([...arr]);

	}

	const initList = () => {
		console.log("dishList: ", props.dishArray)
		let listItemsX = props.dishArray.map((item) => (
			<div >
				<ListItem
					key={item.dish_name}
					className={
						props.clickedItem && props.clickedItem === item.dish_name ? (
							classes.listItemClicked
						) : (
							classes.listItemNotClicked
						)
					}

				>
					<ListItemIcon >
						{props.clickedItem && props.clickedItem === item.dish_name && (
							<DoneIcon style={{ color: 'rgb(102,205,170)', fontSize: '2.2rem' }} />
						)}
					</ListItemIcon>
					<ListItemText primary={item.dish_name} onClick={() => handleClick(item)} style={{ cursor: "pointer" }} />
					<CancelIcon style={{ color: 'rgb(250,128,114)', fontSize: '14', marginLeft: 20, cursor: "pointer" }} onClick={() => removeFromMenu(item)} />
				</ListItem>
				<Divider />
			</div>
		));

		setListItems(listItemsX);
	};

	return <List style={{ maxHeight: 500, minWidth: 300, overflow: 'auto' }}>{listItems}</List>;
};

// export default MovieList;
const mapStateToProps = (state) => ({
	dishArray: state.AppReducer.dishArray,
	clickedItem: state.AppReducer.clickedItem
});

const mapDispatchToProps = {
	setDishArray,
	setClickedItem
};
export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
