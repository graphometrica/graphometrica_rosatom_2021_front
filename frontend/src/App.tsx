import React from 'react';
import { HashRouter as Router, Route, Switch, useHistory, useLocation, useParams } from 'react-router-dom';

import { LayoutContainer } from './layout';
import { CalculatedPage, HomePage, QueuePage, SelectStationsPage } from './pages';


function App() {
  return (

    <>
      <Route path="/" exact >
        <LayoutContainer>
          <SelectStationsPage />
        </LayoutContainer>
      </Route>

      <Route path="/queue" exact >
        <LayoutContainer>
          <QueuePage />
        </LayoutContainer>
      </Route>

      <Route path="/calculated" exact >
        <LayoutContainer>
          <CalculatedPage />
        </LayoutContainer>
      </Route>
    </>
  );
}

export default App;
