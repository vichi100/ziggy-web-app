import React, { Component, useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DoneIcon from '@material-ui/icons/Done';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';

const SERVER_URL = 'http://flicksickserver.com';
// const SERVER_URL_PROD = 'http://flicksickserver.com';
// const SERVER_URL_DEV = 'http://192.168.0.101:3050';

// https://codesandbox.io/s/material-demo-forked-tw56s?file=/demo.js



const MovieList = (props) => {
	const { classes, setSelectedDish, dishArray } = props;
	const [clickedItem, setClickedItem] = useState(null);
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
		setClickedItem(item.dish_name);
		setSelectedDish(item);
		// this.setState({
		// 	clickedItem: item.id
		// });
	};

	useEffect(

		() => {
			console.log("dishArray: ", dishArray)
			if (dishArray.length > 0 || clickedItem) {
				initList();
			}
		},
		[clickedItem, dishArray]
	);

	const initList = () => {
		console.log("dishList: ", dishArray)
		let listItemsX = dishArray.map((item) => (
			<div>
				<ListItem
					key={item.dish_name}
					className={
						clickedItem && clickedItem === item.dish_name ? (
							classes.listItemClicked
						) : (
							classes.listItemNotClicked
						)
					}
					onClick={() => handleClick(item)}
				>
					<ListItemIcon>
						{clickedItem === item.dish_name && (
							<DoneIcon style={{ color: 'rgb(239, 239, 239)', fontSize: '2.2rem' }} />
						)}
					</ListItemIcon>
					<ListItemText primary={item.dish_name} />
				</ListItem>
				<Divider />
			</div>
		));

		setListItems(listItemsX);
	};

	return <List style={{ maxHeight: 500, overflow: 'auto' }}>{listItems}</List>;
};

export default MovieList;
