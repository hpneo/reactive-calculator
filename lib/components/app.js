const React = require('react'),
      { connect } = require('react-redux'),
      NumberButton = require('./number_button'),
      OperatorButton = require('./operator_button');

class App extends React.Component {
  render() {
    return (
      <section className='calculator'>
        <div className='calc-display'>{this.props.displayText}</div>
        <aside className='calc-pad'>
          {[7, 8, 9, 4, 5, 6, 1, 2, 3].map(function(number) {
            return <NumberButton key={number} number={number} />;
          })}
          <NumberButton number={0} />
          <NumberButton number='.' />
          <OperatorButton operator='EVAL' value='=' extraClasses='evaluate'  />
        </aside>
        <aside className='calc-operators'>
          <OperatorButton operator='C' value='C'  />
          <OperatorButton operator='ADD' value='+' extraClasses='add'  />
          <OperatorButton operator='SUBTRACT' value='-' extraClasses='subtract'  />
          <OperatorButton operator='MULTIPLY' value='×' extraClasses='multiply'  />
          <OperatorButton operator='DIVIDE' value='/' extraClasses='divide'  />
        </aside>
      </section>
    );
  }
}

module.exports = connect(function(state) {
  return {
    displayText: state.displayText
  };
})(App);