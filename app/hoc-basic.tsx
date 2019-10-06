import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Take in a component as argument WrappedComponent
function simpleHOC(WrappedComponent) {
  // And return a new anonymous component
  return class extends React.Component{
    render() {
      return <WrappedComponent {...this.props}/>;
    }
  }
}

const Hello = ({ name }) => <h1>Hello {name}!</h1>;

// Create a new component
const NewComponent = simpleHOC(Hello);

const App = () =>
  <div>
    <NewComponent name="CodeSandbox" />
  </div>;

ReactDOM.render(<App />, document.getElementById("root"));