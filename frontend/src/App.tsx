import React from 'react';
import { HashRouter as Router, Route, Switch, useHistory, useLocation, useParams } from 'react-router-dom';

import { HomePage } from './pages';


function App() {
  return (

    <>
      <Route path="/" exact >
        <HomePage />
      </Route>
    </>
  );
}

export default App;
