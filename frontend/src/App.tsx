import React from 'react';
import { HashRouter as Router, Route, Switch, useHistory, useLocation, useParams } from 'react-router-dom';

import { LayoutContainer } from './layout';
import { HomePage } from './pages';


function App() {
  return (

    <>
      <Route path="/" exact >
        <LayoutContainer>
          <HomePage />
        </LayoutContainer>
      </Route>
    </>
  );
}

export default App;
