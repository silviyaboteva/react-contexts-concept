import * as React from 'react';
import * as ReactDOM from 'react-dom';

import '../style.css';

export const themes = {
  primary: {
    color: '#ffffff',
    background: '#337ab7',
  },
  success: {
    color: '#ffffff',
    background: '#5cb85c'
  }
};

//Creates a Context object.
// The defaultValue argument is only used when a component does not have a matching Provider above it in the tree. 
//One Provider can be connected to many consumers.
const ThemeContext = React.createContext({
  theme: themes.primary, 
  changeTheme: () => {}
  });

//React DevTools uses this string to determine what to display for the context.
ThemeContext.displayName = 'MyThemeContext';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.changeTheme = () => {
      console.log("App state: ", this.state);
      this.setState(state => ({
              theme:
                state.theme === themes.primary
                  ? themes.success
                  : themes.primary,
            }));
    }

    this.state = {
      theme: themes.success,
      changeTheme: this.changeTheme,
    };
  }

  render() {
    return (
      <div>
      <ThemeContext.Provider value={this.state}>
        <p>The ThemeContext.Provider provides the whole App state object as value down to the ThemedButton. In the ThemedButton there is ThemeContext.Consumer implementation which consumes the value object and on click fires the changeTheme function to change the theme.</p>
        <Content/>
      </ThemeContext.Provider>
      </div>
    );
  }
}

function Content(props) {
  console.log("Toolbar props: ", props);

  return (
    <div>
      <ThemedButton/>
    </div>
  );
}

class ThemedButton extends React.Component {
  render() {
    //Another way to subscribe the ThemedButton to the ThemeContext object is with class field
    //static contextType = ThemeContext;
    let theme = this.context;
    let props = this.props;
    console.log("Themed Button context: ", theme);
    console.log("ThemedButton props: ", props);

    return (
      <ThemeContext.Consumer>
        {({theme, changeTheme}) => (
          <button
            className={'my-btn'}
            onClick={changeTheme}
            style={{
              backgroundColor: theme.background,
              color: theme.color}}>
            Toggle Theme
          </button>
        )}
      </ThemeContext.Consumer>
    );
  }
}

// Subscribe the ThemedButton to the ThemeContext object
// The contextType property on a class can be assigned a Context object created by React.createContext(). This lets you consume the nearest current value of that Context type using this.context. You can reference this in any of the lifecycle methods including the render function.
ThemedButton.contextType = ThemeContext;

ReactDOM.render(<App />, document.getElementById("root"));