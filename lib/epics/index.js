require('rxjs');

const { combineEpics } = require('redux-observable'),
      actions = require('../constants');

function getOperator(operator) {
  switch (operator) {
    case actions.ADD:
      return '+';
    case actions.SUBTRACT:
      return '-';
    case actions.MULTIPLY:
      return '×';
    case actions.DIVIDE:
      return '/';
  }
}

function resultEpic(action$, store) {
  return action$.ofType(actions.EVAL).map(function(data) {
    return {
      type: actions.DISPLAY_RESULT
    };
  });
};

function displayOngoingOperationEpic(action$, store) {
  return action$.ofType(actions.SET_OPERATOR).map(function(data) {
    let state = store.getState();

    return {
      type: actions.DISPLAY_OPERATION,
      payload: `${state.previousValue} ${getOperator(state.operator)}`
    };
  });
}

function displayCompleteOperationEpic(action$, store) {
  return action$.ofType(actions.DISPLAY).filter(function(data) {
    let state = store.getState();

    return state.operator && state.currentValue && state.previousValue;
  }).map(function(data) {
    let state = store.getState();

    return {
      type: actions.DISPLAY_OPERATION,
      payload: `${state.previousValue} ${getOperator(state.operator)} ${state.currentValue}`
    };
  });
}

module.exports = combineEpics(displayOngoingOperationEpic, displayCompleteOperationEpic, resultEpic);