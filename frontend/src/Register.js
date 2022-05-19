import React from 'react';
import swal from 'sweetalert';
import { Button, TextField, Link } from '@material-ui/core';
const axios = require('axios');

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirm_password: '',
      mobile_nr: '',
      gender: '',
      type: ''
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  register = () => {

    axios.post('http://localhost:2000/register', {
      username: this.state.username,
      password: this.state.password,
      mobile_nr: this.state.mobile_nr,
      gender: this.state.gender,
      type: this.state.type
    }).then((res) => {
      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });
      if(this.state.type==="Patient"){
        this.props.history.push('/login');
      }
      else{
        this.props.history.push('/doc_login');
      }
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
    });
  }

  render() {
    return (
      <div className='mainDiv' style={{ marginTop: '100px' }}>
        <div>
          <h2>Register</h2>
        </div>

        <div>
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            placeholder="User Name"
            required
          />
          <br /><br />
          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            placeholder="Password"
            required
          />
          <br /><br />
          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="confirm_password"
            value={this.state.confirm_password}
            onChange={this.onChange}
            placeholder="Confirm Password"
            required
          />
          <br /><br />
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="mobile_nr"
            value={this.state.mobile_nr}
            onChange={this.onChange}
            placeholder="Mobile Number"
            required
          />
          <br /><br />

          <label type="text" value="User type">User Type:</label>
          <input 
            id="radioDoctor"
            type="radio" 
            value="Doctor" 
            name="type"
            onChange={this.onChange} 
            required
          />Doctor
          
          <input  
            id="radioPatient"
            type="radio" 
            value="Patient" 
            name="type"
            onChange={this.onChange} 
            required
          /> Patient
          <br /><br />

          <label id='labelGender' type="text" value="Gender">Gender at birth:</label>
          <input 
            id='radioMale'
            type="radio" 
            value="Male" 
            name="gender"
            onChange={this.onChange} 
            required
          /> Male
          
          <input
            id='radioFemale'
            type="radio" 
            value="Female" 
            name="gender"
            onChange={this.onChange} 
            required
          /> Female
          <br /><br />

          <Link href="/login">
            Already a user?
          </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            disabled={this.state.username === '' && this.state.password === ''}
            onClick={this.register}
          >
            Register
          </Button> 
          
        </div>
      </div>
    );
  }
}
