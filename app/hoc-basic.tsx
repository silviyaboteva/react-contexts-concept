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

const App = () =>
  <div>
    <NewComponent name="CodeSandbox" />
    <HelloReact/>
  </div>;

ReactDOM.render(<App />, document.getElementById("root"));