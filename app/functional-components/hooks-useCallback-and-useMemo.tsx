import React, { useState, useCallback } from 'react';
import * as ReactDOM from 'react-dom';

// Generates random colours any time it's called
const randomColour = () => '#'+(Math.random()*0xFFFFFF<<0).toString(16);

// The type of the props
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

// A memoized button with a random background colour

const Button = React.memo((props: ButtonProps) => 
  <button onClick={props.onClick} style={{background: randomColour()}}> 
    {props.children}
  </button>
)

// Keeps track of all created functions during the app's life 
const functions: Set<any> = new Set();

const App = () => {
  const [delta, setDelta] = useState(1);
  const [c, setC] = useState(0);
 
  // No dependencies (i.e. []) for now
  const incrementDelta = useCallback(() => setDelta(delta => delta + 1), []);
  const increment = useCallback(() => setC(c => c + delta), [delta]);

  // Can depend on [delta] instead, but it would be brittle
  const incrementBoth = useCallback(() => {
      incrementDelta();
      increment();
  }, [increment, incrementDelta]); 

  // Register the functions so we can count them
  // functions.add(incrementDelta);
  // functions.add(increment);
  functions.add(incrementBoth);

  return (<div>
    <div> Delta is {delta} </div>
    <div> Counter is {c} </div>
    <br/>
    <div>
      <Button onClick={incrementDelta}>Increment Delta</Button>
      <Button onClick={increment}>Increment Counter</Button>
    </div>
    <br/>
    <div> Newly Created Functions: {functions.size - 1} </div>
  </div>)
}

ReactDOM.render(<App />, document.getElementById("root"));