const React = require('react'),
      { Provider } = require('react-redux'),
      ReactDOM = require('react-dom'),
      App = require('./components/app'),
      store = require('./store');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.querySelector('#app'));