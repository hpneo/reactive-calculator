const React = require('react'),
      { connect } = require('react-redux'),
      OperatorButton = function(props) {
        let dispatch = props.dispatch,
            operator = props.operator;

        return (
          <button className={'operator-button ' + (props.extraClasses || '')} onClick={function() {
            if (operator === 'EVAL') {
              dispatch({ type: 'EVAL' });
            }
            else if (operator === 'C') {
              dispatch({ type: 'C' });
            }
            else {
              dispatch({ type: 'SET_OPERATOR', operator });
            }
          }}>
            {props.value}
          </button>
        );
      };

module.exports = connect()(OperatorButton);