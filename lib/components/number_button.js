const React = require('react'),
      { connect } = require('react-redux'),
      actions = require('../constants'),
      NumberButton = function(props) {
        let dispatch = props.dispatch,
            number = props.number;

        return (
          <button key={props.number} className={'number-button ' + (props.extraClasses || '')} onClick={function() {
            dispatch({ type: actions.DISPLAY, payload: number });
          }}>
            {props.number}
          </button>
        );
      };

module.exports = connect()(NumberButton);