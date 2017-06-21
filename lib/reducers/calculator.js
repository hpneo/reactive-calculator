const actions = require('../constants'),
      initialState = {
        currentValue: 0,
        previousValue: 0,
        operator: null,
        displayText: '0',
        negativeMode: false
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
      let number = action.payload;

      if (state.negativeMode) {
        number = `-${number}`;
      }

      newState = {
        // currentValue: state.currentValue == 0 ? action.payload.toString() : (state.currentValue.toString() + action.payload.toString()),
        // displayText: state.currentValue == 0 ? action.payload.toString() : (state.currentValue.toString() + action.payload.toString())
        currentValue: state.currentValue == 0 ? number.toString() : (state.currentValue.toString() + number.toString()),
        displayText: state.currentValue == 0 ? number.toString() : (state.currentValue.toString() + number.toString())
      };
    break;
    case actions.SET_OPERATOR:
      if (action.operator === actions.SUBTRACT && state.previousValue) {
        newState = {
          currentValue: 0
        };
      }
      else {
        newState = {
          currentValue: 0,
          operator: action.operator,
          previousValue: (state.operator && state.previousValue) ? calculate(state.previousValue, parseFloat(state.currentValue), state.operator) : parseFloat(state.currentValue)
        };
      }
    break;
    case actions.DISPLAY_OPERATION:
      newState = {
        displayText: action.payload
      };
    break;
    case actions.EVAL:
      newState = {
        currentValue: state.operator ? calculate(state.previousValue, parseFloat(state.currentValue), state.operator) : 0,
        operator: null,
        previousValue: 0,
        displayText: state.operator ? calculate(state.previousValue, parseFloat(state.currentValue), state.operator).toString() : 0
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
    case actions.SET_NEGATIVE:
      newState = {
        negativeMode: !state.negativeMode
      };
    break;
    default:
      newState = state;
    break;
  }

  return Object.assign({}, state, newState);
}