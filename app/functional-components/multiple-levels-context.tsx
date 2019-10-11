import React, { Fragment, useState  } from 'react';
import * as ReactDOM from 'react-dom';

const PackageContext = React.createContext(undefined);

const Provider = props => {
  const [state, setState] = useState({
    companyName: "Progress",
    employeeName: "Silviya",
    hardware: "MacBook Pro retina Display",
    deliveryStatus: "Delivery In Progress..."

  });
  console.log(state);
  return (
   <PackageContext.Provider
      value={{
        data: state,
        updateDeliveryStatus: () => {
          setState({ ...state, deliveryStatus: "Delivered" });
        }
      }}
    >
      {props.children}
    </PackageContext.Provider>
  );
};

const Building = () => {
  return <Floor1/>;
};

const Floor1 = () => {
  return <Floor2 />;
}

const Floor2 = () => {
  return <Floor3 />;
}

const Floor3 = () => {
  return <Floor7 />;
}

const Floor7 = () => {
  return (
    <PackageContext.Consumer>
      {context => (
        <Fragment>
          <h3>Welcome to Floor 7</h3>
          <p>
            <strong>Company Name: </strong>
            {context.data.companyName}
          </p>
          <p>
            <strong>Employee Name: </strong>
            {context.data.employeeName}
          </p>
          <p>
            <strong>Hardware: </strong>
            {context.data.hardware}
          </p>
          <p>
            <strong>Delivery Status: </strong>
            {context.data.deliveryStatus}
          </p>
          <button onClick={context.updateDeliveryStatus}>
            Update Delivery Status
          </button>
        </Fragment>
      )}
      </PackageContext.Consumer>
    );
}

const App = () => {
  return (
     <div className="App">
      <h1>Simple Context API Tutorial using Hook(useState)</h1>
      <Provider>
        <Building />
      </Provider>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById("root"));