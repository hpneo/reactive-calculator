const { createStore, applyMiddleware } = require('redux'),
      { createEpicMiddleware } = require('redux-observable'),
      { calculatorReducer } = require('../reducers/calculator'),
      rootEpic = require('../epics'),
      epicMiddleware = createEpicMiddleware(rootEpic);

module.exports = createStore(calculatorReducer, applyMiddleware(epicMiddleware));