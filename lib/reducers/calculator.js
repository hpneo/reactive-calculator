const actions = require('../constants'),
      initialState = {
        currentValue: 0,
        previousValue: 0,
        operator: null,
        displayText: '0'
      };

function calculate(previousValue, currentValue, operator) {
  switch (operator) {
    case actions.ADD:
      return previousValue + currentValue;
    case actions.SUBTRACT:
      return previousValue - currentValue;
    case actions.MULTIPLY:
      return previousValue * currentValue;
    case actions.DIVIDE:
      return previousValue / currentValue;
  }
}

export function calculatorReducer(state = initialState, action) {
  // console.log(action, state);
  let newState;

  switch (action.type) {
    case actions.DISPLAY_RESULT:
      newState = {
        displayText: state.currentValue.toString(),
        previousValue: state.currentValue.toString(),
        currentValue: 0
      };
    break;
    case actions.DISPLAY:
      newState = {
        currentValue: state.currentValue == 0 ? action.payload.toString() : (state.currentValue.toString() + action.payload.toString()),
        displayText: state.currentValue == 0 ? action.payload.toString() : (state.currentValue.toString() + action.payload.toString())
      };
    break;
    case actions.SET_OPERATOR:
      newState = {
        currentValue: 0,
        operator: action.operator,
        previousValue: state.operator ? calculate(state.previousValue, parseFloat(state.currentValue), state.operator) : parseFloat(state.currentValue)
      };
    break;
    case actions.DISPLAY_OPERATION:
      newState = {
        displayText: action.payload
      };
    break;
    case actions.EVAL:
      newState = {
        currentValue: calculate(state.previousValue, parseFloat(state.currentValue), state.operator),
        operator: null,
        previousValue: 0,
        displayText: calculate(state.previousValue, parseFloat(state.currentValue), state.operator).toString()
      };
    break;
    case actions.C:
      newState = {
        currentValue: 0,
        previousValue: 0,
        operator: null,
        displayText: ''
      };
    break;
    default:
      newState = state;
    break;
  }

  // console.log(Object.assign({}, state, newState));

  return Object.assign({}, state, newState);
}