import React, { Component } from 'react';
import {
  Button, TextField, LinearProgress,
  TableBody, Table,
  TableContainer, TableHead, TableRow, TableCell
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

const axios = require('axios');

export default class doc_Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      openDrugModal: false,
      openDrugEditModal: false,
      id: '',
      patient_name: '',
      drug_name: '',
      dosage: '',
      frequency: '',
      adherence: '',
      reason: '',
      page: 1,
      search: '',
      drugs: [],
      pages: 0,
      loading: false
    };
  }

  componentDidMount = () => {
    let token = localStorage.getItem('token');
    if (!token) {
      this.props.history.push('/login');
    } else {
      this.setState({ token: token }, () => {
        this.getDrug();
      });
    }
  }

  logOut = () => {
    localStorage.setItem('token', null);
    this.props.history.push('/');
  }

  getDrug = () => {
    
    this.setState({ loading: true });

    let data = '?';
    data = `${data}page=${this.state.page}`;
    if (this.state.search) {
      data = `${data}&search=${this.state.search}`;
    }
    axios.get(`http://localhost:2000/get-drug${data}`, {
      headers: {
        'token': this.state.token
      }
    }).then((res) => {
      this.setState({ loading: false, drugs: res.data.drugs, pages: res.data.pages });
    }).catch((err) => {
      this.setState({ loading: false, drugs: [], pages: 0 },()=>{});
    });
  }

  handleDrugOpen = () => {
    this.setState({
      openDrugModal: true,
      id: '',
      patient_name: '',
      drug_name: '',
      dosage: '',
      frequency: '',
      adherence: '',
      reason: ''
    });
  };

  handleDrugClose = () => {
    this.setState({ openDrugModal: false });
  };
 
  render() {
    return (
      <div className='mainDiv'>
        {this.state.loading && <LinearProgress size={40} />}
        <div>
          <h2>Doctor's Dashboard</h2>
          
          <Button
            className="button_style"
            variant="contained"
            size="small"
            onClick={this.logOut}
          >
            Log Out
          </Button>
        </div>

        <br />

        <TableContainer>
          <TextField
            id="standard-basic"
            type="search"
            autoComplete="off"
            name="search"
            value={this.state.search}
            onChange={this.onChange}
            placeholder="Search by patient name"
            required
          />
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Patient Name</TableCell>
                <TableCell align="center">Drug Name</TableCell>
                <TableCell align="center">Dosage</TableCell>
                <TableCell align="center">Frequency</TableCell>
                <TableCell align="center">Adherence</TableCell>
                <TableCell align="center">Reason</TableCell>
               
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.drugs.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="center" component="th" scope="row">
                    {row.name}
                  </TableCell>
                  
                  <TableCell align="center">{row.dosage}</TableCell>
                  <TableCell align="center">{row.frequency}</TableCell>
                  <TableCell align="center">{row.adherence}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <br />
          <Pagination count={this.state.pages} page={this.state.page} onChange={this.pageChange} color="primary" />
        </TableContainer>

      </div>
    );
  }
}