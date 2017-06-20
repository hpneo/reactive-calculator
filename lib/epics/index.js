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
    let state = store.getState(),
        display;

    if (state.operator === actions.SUBTRACT && state.previousValue === 0) {
      display = `${getOperator(state.operator)}`;
    }
    else {
      display = `${state.previousValue} ${getOperator(state.operator)}`;
    }

    return {
      type: actions.DISPLAY_OPERATION,
      payload: display
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

function displayNegativeNumberEpic(action$, store) {
  return action$.ofType(actions.DISPLAY).filter(function(data) {
    let state = store.getState();

    return state.operator === actions.SUBTRACT && state.currentValue > 0 && state.previousValue === 0;
  }).map(function(data) {
    let state = store.getState();

    return {
      type: actions.DISPLAY_OPERATION,
      payload: `${getOperator(state.operator)}${state.currentValue}`
    };
  });
}

module.exports = combineEpics(displayNegativeNumberEpic, displayOngoingOperationEpic, displayCompleteOperationEpic, resultEpic);