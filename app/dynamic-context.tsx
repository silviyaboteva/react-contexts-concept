import * as React from 'react';
import * as ReactDOM from 'react-dom';

// import { DropDownList } from '@progress/kendo-react-dropdowns';
// import { Button } from '@progress/kendo-react-buttons';

export const kendoThemes = {
  light: {
    color: '#656565',
    background: '#f6f6f6',
  },
  dark: {
    color: '#f6f6f6',
    background: '#656565',
  },
};

export const ThemeContext = React.createContext(null);


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      themes: kendoThemes,
      selected: kendoThemes.light,
    };

    this.toggleTheme = () => {
      this.setState(state => ({
        selected:
          state.selected === kendoThemes.dark
            ? kendoThemes.light
            : kendoThemes.dark,
      }));
    };
  }

  render() {
    // The ThemedButton button inside the ThemeProvider
    // uses the theme from state while the one outside uses
    // the default dark theme
    return (
      <div style={{display: "flex", flexDirection: "row"}}>
        <ThemeContext.Provider value={this.state.selected}>
          <Toolbar changeTheme={this.toggleTheme} />
          <ThemedButton>Check how my value are changing</ThemedButton>
        </ThemeContext.Provider>
      </div>
    );
  }
}

// An intermediate component that uses the ThemedButton
function Toolbar(props) {
  return (
    <MyDropDownList onClick={props.changeTheme}>
      Change Theme
    </MyDropDownList>
  );
}

class MyDropDownList extends React.Component {
  render() {
      let theme = this.context;
      console.log(theme, "drop down context");
    return (
      <select>
        <option value="volvo">Volvo</option>
      </select>
    )
  }
}


export default MyDropDownList;

class ThemedButton extends React.Component {
  render() {
    let props = this.props;
    let theme = this.context;
    return (
      <button
        {...props}
        style={{backgroundColor: theme.background, color: theme.color}}
      />
    );
  }
}

ThemedButton.contextType = ThemeContext;

export default ThemedButton;

ReactDOM.render(<App />, document.getElementById("root"));
