import React, { Fragment, useState, useContext  } from 'react';
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
  const packageContext = useContext(PackageContext);

  return (
        <Fragment>
          <h3>Welcome to Floor 7</h3>
          <p>
            <strong>Company Name: </strong>
            {packageContext.data.companyName}
          </p>
          <p>
            <strong>Employee Name: </strong>
            {packageContext.data.employeeName}
          </p>
          <p>
            <strong>Hardware: </strong>
            {packageContext.data.hardware}
          </p>
          <p>
            <strong>Delivery Status: </strong>
            {packageContext.data.deliveryStatus}
          </p>
          <button onClick={packageContext.updateDeliveryStatus}>
            Update Delivery Status
          </button>
        </Fragment>
    );
}

const App = () => {
  return (
     <div className="App">
      <h1>Simple Context API Tutorial using Hooks (useState and useContext)</h1>
      <Provider>
        <Building />
      </Provider>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById("root"));