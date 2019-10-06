import * as React from 'react';
import * as ReactDOM from 'react-dom';

const Hello = ({ name }) => <h1>Hello {name}!</h1>;

// Take in a component as argument WrappedComponent
function simpleHOC(WrappedComponent) {
  // And return a new anonymous component
  return class extends React.Component{
    render() {
      return <WrappedComponent {...this.props}/>;
    }
  }
}

// Create a new component
const NewComponent = simpleHOC(Hello);



// Take in a component as argument WrappedComponent
function withNameReact(WrappedComponent) {
  // And return a new anonymous component
  return class extends React.Component {
    render() {
      return <WrappedComponent name="React" {...this.props} />;
    }
  };
}

const HelloReact = withNameReact(Hello);



const Button = ({ value, increaseButton }) => <input type={'button'} value={value} onClick={increaseButton}/>;

function clickableButton(WrappedComponent) {
  class ClickableButton extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
       count: 0
      }

      this.handleIncrement = (event) => {
        this.setState({ count: this.state.count + 1})
      }
    }
    render() {
      return (
        <React.Fragment>
          <h1>{this.state.count}</h1>
          <WrappedComponent value={'Clickable button'} increaseButton={this.handleIncrement} {...this.props} />
        </React.Fragment>
      );
    }
  }

  return ClickableButton;
}

const ClickableButton = clickableButton(Button);

const App = () =>
  <div>
    <p>Hello Component (Original)</p>
    <Hello name={'Something'}/>
    <p>HOC Component over Hello</p>
    <NewComponent name="CodeSandbox" />
    <p>HOC Component over Hello</p>
    <HelloReact/>

    <p>Button Component (Original)</p>
    <Button/>
    <p>HOC Component over Button</p>
    <ClickableButton/>
  </div>;

ReactDOM.render(<App />, document.getElementById("root"));