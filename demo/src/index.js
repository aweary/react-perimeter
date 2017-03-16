import React, { Component } from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
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

const PreloadLink = ({ to, children, preload, buffer }) => (
  <Perimeter buffer={buffer} onBreach={preload}>
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
      <Router>
        <div>
          <ul>
             <li>
              <PreloadLink to="/" preload={Home.preload} buffer={20}>
                Home
              </PreloadLink>
            </li>
            <li>
              <PreloadLink to="/about" preload={About.preload} buffer={20}>
                About
              </PreloadLink>
            </li>
            <li>
              <PreloadLink to="/topics" preload={About.preload} buffer={20}>
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
    );
  }
}

render(<App />, document.getElementById("app"));
