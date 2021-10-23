import React from 'react';
import { HashRouter as Router, Route, Switch, useHistory, useLocation, useParams } from 'react-router-dom';

import { LayoutContainer } from './layout';
import { CalculatedPage, QueuePage, SelectStationsPage } from './pages';
import { getLinesFx, getRoutesFx, getStationsFx } from './store';


function App() {
  const history = useHistory()
  const location = useLocation();

  const reloadAppData = () => {
    console.log('reloadAppData')
    getRoutesFx();
    getLinesFx();
    getStationsFx();
  }

  React.useEffect(() => {
    reloadAppData()
  }, [])

  React.useEffect(() => {
    return history.listen((newLocation) => {
      reloadAppData();
    })
  }, [location.pathname])


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
