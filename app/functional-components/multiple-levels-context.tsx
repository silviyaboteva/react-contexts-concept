import React, { Fragment, useState, useContext, useCallback  } from 'react';
import * as ReactDOM from 'react-dom';

const PackageContext = React.createContext(undefined);

const Provider = props => {
  const [companyName, setCompanyName] = useState("Progress");
  const [employeeName, setEmployeeName] = useState("Silviya");
  const [hardware, setHardware] = useState("MacBook Pro retina Display");
  const [status, setStatus] = useState("Delivery In Progress...");

  const onUpdateStatus = React.useCallback(
    () => {
      setStatus("Delivered");
      console.log("Status state", status);
    }, []);
    
  return (
   <PackageContext.Provider
      value={{
        companyName, 
        employeeName, 
        hardware, 
        status,
        onUpdateStatus
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
  console.log(packageContext);

  return (
        <Fragment>
          <h3>Welcome to Floor 7</h3>
          <p>
            <strong>Company Name: </strong>
            {packageContext.companyName}
          </p>
          <p>
            <strong>Employee Name: </strong>
            {packageContext.employeeName}
          </p>
          <p>
            <strong>Hardware: </strong>
            {packageContext.hardware}
          </p>
          <p>
            <strong>Delivery Status: </strong>
            {packageContext.status}
          </p>
          <button onClick={packageContext.onUpdateStatus}>
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