import React, { useContext } from 'react';
import * as ReactDOM from 'react-dom';

const UserContext = React.createContext({});

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
export default UserContext

const App = () => {
  const user = { name: 'Silviya', loggedIn: true }

  return (
    <UserProvider value={user}>
      <ClassComponent/>
      <FunctionalComponent/>
    </UserProvider>
  )
}

class ClassComponent extends React.Component {
  static contextType = UserContext;

  componentDidMount() {
    const user = this.context;
    console.log(user) 
  }

  render() {
    const user = this.context;
    console.log(user);
    return <div>My user name rendered from the class component: {user.name}</div>
  }
}

const FunctionalComponent = () => {
  const user = useContext(UserContext);
  console.log(user);

  return (
    <div>My user name rendered from the functional component: {user.name}</div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));