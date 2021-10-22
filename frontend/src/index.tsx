import './assets/styles/App.less';

import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { HashRouter as Router } from 'react-router-dom';

import App from './App';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: 'tracked',
    },
    mutations: {

    }
  }
});



ReactDOM.render(

  <QueryClientProvider client={queryClient}>
    <Router>
      <App />
    </Router>
    <ReactQueryDevtools initialIsOpen={true} />
  </QueryClientProvider>
  ,
  document.getElementById('root')
);

