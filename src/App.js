import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useRoutes, A } from 'hookrouter';
import routes from './routes';
import { Provider } from 'react-redux';
import configureStore from './Store';

const store = configureStore();

const App = () => {
  const routeResult = useRoutes(routes);
  return (
    <Provider store={store}>
      {routeResult}
    </Provider>

  );
};

export default App;