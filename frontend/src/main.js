import React from 'react';
import {Link } from '@material-ui/core';

export default class main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  
  render() {
    return (
      <div className='mainDiv' style={{ marginTop: '200px'}}>

        <div style={{marginBottom: '50px'}}>
          <h2>Welcome to the Medical Adherence Web App!</h2>
          <h3>Get started as a:</h3>
        </div>

          <Link className='mainButton' href="/doc_login">
            Doctor
          </Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


          <Link className='mainButton' href="/login">
            Patient
          </Link>
        </div>
    
    );
  }
}
