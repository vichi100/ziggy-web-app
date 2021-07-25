import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useRoutes, A } from 'hookrouter';
import routes from './routes';

const App = (props) => {
  const routeResult = useRoutes(routes);
  return routeResult;
};

export default App;