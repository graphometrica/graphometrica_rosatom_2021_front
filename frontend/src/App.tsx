import React from 'react';
import { HashRouter as Router, Route, Switch, useHistory, useLocation, useParams } from 'react-router-dom';

import { LayoutContainer } from './layout';
import { CalculatedPage, HomePage, QueuePage, SelectStationsPage } from './pages';
import { downloadDataFx, getLinesFx, getRoutesFx, getStationsFx } from './store';


function App() {
  const history = useHistory()
  const location = useLocation();



  React.useEffect(() => {
    downloadDataFx()
  }, [])

  React.useEffect(() => {
    return history.listen((newLocation) => {
      downloadDataFx();
    })
  }, [location.pathname])


  return (

    <>
      <Route path="/test" exact >
        <LayoutContainer>
          <HomePage />
        </LayoutContainer>
      </Route>

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
