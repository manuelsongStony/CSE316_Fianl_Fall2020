import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Home</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
         
          <li className="navbar-item">
          <Link to="/labtech" className="nav-link">labtech</Link>
          </li>
          <li className="navbar-item">
          <Link to="/employee" className="nav-link">employee</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}