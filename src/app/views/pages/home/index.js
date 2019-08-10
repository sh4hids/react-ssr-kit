import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Wrapper } from '../../components';
import logo from '../../../logo.svg';
import '../../../App.css';

class HomePage extends Component {
  render() {
    return (
      <Wrapper>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Link to="/posts">Visit our blog</Link>
        </header>
      </Wrapper>
    );
  }
}

export default HomePage;
