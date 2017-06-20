const React = require('react'),
      { connect } = require('react-redux'),
      actions = require('../constants'),
      OperatorButton = function(props) {
        let dispatch = props.dispatch,
            operator = props.operator;

        return (
          <button className={'operator-button ' + (props.extraClasses || '')} onClick={function() {
            if (operator === actions.EVAL) {
              dispatch({ type: actions.EVAL });
            }
            else if (operator === actions.C) {
              dispatch({ type: actions.C });
            }
            else {
              dispatch({ type: actions.SET_OPERATOR, operator });
            }
          }}>
            {props.value}
          </button>
        );
      };

module.exports = connect()(OperatorButton);