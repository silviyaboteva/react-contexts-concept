import * as React from 'react';
import * as ReactDOM from 'react-dom';

//Creates a Context object.
// The defaultValue argument is only used when a component does not have a matching Provider above it in the tree. 

//One Provider can be connected to many consumers.
const ThemeContext = React.createContext('#ffffff');

//React DevTools uses this string to determine what to display for the context.
ThemeContext.displayName = 'MyThemeContext';

class App extends React.Component {
  render() {
    return (
      <div>
      <ThemeContext.Provider value="#000000">
        <p>Here the current theme value is read from the closest Provider value, e.g. black</p>
        <Toolbar />

        <p>The context consumer value is:</p>
        <ThemeContext.Consumer>
          {value => (
            <h2>{value}</h2>
          )}
        </ThemeContext.Consumer>
      </ThemeContext.Provider>

      <p>Here the current theme is the default created context value, e.g. white</p>
       <Toolbar />

        <p>The context consumer value is:</p>
       <ThemeContext.Consumer>
        {value => (
          <h2>{value}</h2>
        )}
      </ThemeContext.Consumer>
      </div>
    );
  }
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  render() {
    //Another way to subscribe the ThemedButton to the ThemeContext object is with class field
    //static contextType = ThemeContext;
    let theme = this.context;
    console.log(theme);

    return (
      <button style={{backgroundColor: theme}}>Button</button>
    );
  }
}

// Subscribe the ThemedButton to the ThemeContext object
// The contextType property on a class can be assigned a Context object created by React.createContext(). This lets you consume the nearest current value of that Context type using this.context. You can reference this in any of the lifecycle methods including the render function.
ThemedButton.contextType = ThemeContext;

ReactDOM.render(<App />, document.getElementById("root"));