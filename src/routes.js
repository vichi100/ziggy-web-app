import React from 'react';
import SignInSide from './SignInSide';
import Menu from './Menu';
import AddNewRestaurant from './AddNewRestaurant';
import Home from './Home';
import Privacy from './Privacy';

const routes = {
    '/': () => <Home />,
    '/signin': () => <SignInSide />,
    // '/trending': () => <Trending />,
    '/addNewRestaurant': () => <AddNewRestaurant />,
    '/menu': () => <Menu />,
    '/privacy': () => <Privacy />
};

export default routes;