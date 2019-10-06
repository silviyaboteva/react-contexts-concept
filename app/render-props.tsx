import * as React from 'react';
import * as ReactDOM from 'react-dom';

class Car extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <i className="fa fa-car" style={{ position: 'absolute', left: mouse.x, top: mouse.y, fontSize:'20px' }}></i>
    );
  }
}

class Circle extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <i className="fa fa-circle" style={{ position: 'absolute', left: mouse.x, top: mouse.y, fontSize:'20px', marginTop: '25px' }}></i>
    );
  }
}

// The <Mouse> component encapsulates the behavior we need...
class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }
  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    
    console.log(this.props);
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>

        {/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={mouseState => (
          <React.Fragment>
            <Car mouse={mouseState} />
            <Circle mouse={mouseState} />
          </React.Fragment>
        )}/>
      </div>
    );
  }
}

const App = () =>
  <div>
    <MouseTracker/>
  </div>;

ReactDOM.render(<App />, document.getElementById("root"));