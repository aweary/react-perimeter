import React, { Component } from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import ReactListenerProvider from 'react-listener-provider';
import Home from "./routes/home";
import About from "./routes/about";
import Topics from "./routes/topics";
import Perimeter from "../../src";
import Loaded from "./components/Loaded";
import styled from "styled-components";

const Button = styled.button`
  font-size: 1.25em;
  padding: 10px;
  background-color: rebeccapurple;
  color: white;
  border: none;
  border-radius: 0.25em;
  cursor: pointer;

  &:hover {
    background-color: #311b92;
  }
`;

const PreloadLink = ({ to, children, preload, boundry }) => (
  <Perimeter  padding={boundry} onBreach={preload.preload}>
    <Link to={to}>
      {children}
    </Link>
  </Perimeter>
)

class App extends Component {

  constructor() {
    super();
    this.state = {
      load: false
    }
  }

  render() {
    return (
      <ReactListenerProvider>
        <Router>
          <div>
            <ul>
              <li>
                <PreloadLink to="/" preload={Home} boundry={100}>
                  Home
                </PreloadLink>
              </li>
              <li>
                <PreloadLink to="/about" preload={About} boundry={100}>
                  About
                </PreloadLink>
              </li>
              <li>
                <PreloadLink to="/topics" preload={Topics} boundry={100}>
                  Topics
                </PreloadLink>
              </li>
            </ul>
            <hr />
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/topics" component={Topics} />
          </div>
        </Router>
      </ReactListenerProvider>
    );
  }
}

render(<App />, document.getElementById("app"));
