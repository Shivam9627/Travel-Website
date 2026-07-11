import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import AppRoutes from './routes';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <AppRoutes />
      </Router>
    </Provider>
  );
};

export default App;
