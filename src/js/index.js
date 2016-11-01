import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import bootstrap from './modules/bootstrap';
import App from './components/App';

const {store, actions} = bootstrap();

ReactDOM.render(
  <Provider store={store}>
    <App actions={actions} />
  </Provider>,
  document.querySelector('[data-app]')
);
