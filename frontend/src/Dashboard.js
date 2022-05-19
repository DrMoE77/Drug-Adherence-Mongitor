import React, { Component } from 'react';
import {
  Button, TextField, Dialog, DialogActions, LinearProgress,
  DialogTitle, DialogContent, TableBody, Table,
  TableContainer, TableHead, TableRow, TableCell
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import swal from 'sweetalert';
const axios = require('axios');

export default class Dashboard extends Component {
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

  deletedrug = (id) => {
    axios.post('http://localhost:2000/delete-drug', {
      id: id
    }, {
      headers: {
        'Content-Type': 'application/json',
        'token': this.state.token
      }
    }).then((res) => {

      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });

      this.setState({ page: 1 }, () => {
        this.pageChange(null, 1);
      });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
    });
  }

  pageChange = (e, page) => {
    this.setState({ page: page }, () => {
      this.getDrug();
    });
  }

  logOut = () => {
    localStorage.setItem('token', null);
    this.props.history.push('/');
  }

  onChange = (e) => {
    
    this.setState({ [e.target.name]: e.target.value }, () => { });
    if (e.target.name === 'search') {
      this.setState({ page: 1 }, () => {
        this.getDrug();
      });
    }
  };

  addDrug = () => {
    
    const field = new FormData();
    
    field.append('patient_name', this.state.patient_name);
    field.append('drug_name', this.state.drug_name);
    field.append('dosage', this.state.dosage);
    field.append('frequency', this.state.frequency);
    field.append('adherence', this.state.adherence);
    field.append('reason', this.state.reason);

    axios.post('http://localhost:2000/add-drug', field, {
      headers: {
        'content-type': 'multipart/form-data',
        'token': this.state.token
      }
    }).then((res) => {

      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });

      this.handleDrugClose();
      this.setState({ patient_name: '', drug_name: '', dosage: '', frequency: '', adherence:'', reason: '',page: 1 }, () => {
        this.getDrug();
      });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
      this.handleDrugClose();
    });

  }

  updateDrug = () => {

    const file = new FormData();
    file.append('id', this.state.id);
    file.append('patient_name', this.state.patient_name);
    file.append('drug_name', this.state.drug_name);
    file.append('dosage', this.state.dosage);
    file.append('frequency', this.state.frequency);
    file.append('adherence', this.state.adherence);
    file.append('reason', this.state.reason);

    axios.post('http://localhost:2000/update-drug', file, {
      headers: {
        'content-type': 'multipart/form-data',
        'token': this.state.token
      }
    }).then((res) => {

      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });

      this.handleDrugEditClose();
      this.setState({ patient_name: '', drug_name: '', dosage: '', frequency: '', adherence:'', reason: '',file: null, page: 1 }, () => {
        this.getDrug();
      });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
      this.handleDrugEditClose();
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

  handleDrugEditOpen = (data) => {
    this.setState({
      openDrugEditModal: true,
      patient_name: data.patient_name,
      drug_name: data.drug_name,
      dosage: data.dosage,
      frequency: data.frequency,
      adherence: data.adherence,
      reason: data.reason
    });
  };

  handleDrugEditClose = () => {
    this.setState({ openDrugEditModal: false });
  };

  render() {
    return (
      <div className='mainDiv'>
        {this.state.loading && <LinearProgress size={40} />}
        <div>
          <h2>Patient's Dashboard</h2>
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            onClick={this.handleDrugOpen}
          >
            Add Drug
          </Button>
          <Button
            className="button_style"
            variant="contained"
            size="small"
            onClick={this.logOut}
          >
            Log Out
          </Button>
        </div>

        {/* Edit Drug */}
        <Dialog
          open={this.state.openDrugEditModal}
          onClose={this.handleDrugClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Edit Drug</DialogTitle>
          <DialogContent>
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="drug_name"
              value={this.state.drug_name}
              onChange={this.onChange}
              placeholder="Drug Name"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="number"
              autoComplete="off"
              name="dosage"
              value={this.state.dosage}
              onChange={this.onChange}
              placeholder="Dosage"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="number"
              autoComplete="off"
              name="frequency"
              value={this.state.frequency}
              onChange={this.onChange}
              placeholder="Frequency"
              required
            /><br />
            
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDrugEditClose} color="primary">
              Cancel
            </Button>
            
            <Button
              disabled={this.state.patient_name === '' || this.state.drug_name === '' || this.state.dosage === '' || this.state.frequency === '' || this.state.adherence === '' || this.state.reason === ''}
              onClick={(e) => this.updateDrug()} color="primary" autoFocus>
              Edit Drug
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Drug */}
        <Dialog
          open={this.state.openDrugModal}
          onClose={this.handleDrugClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Add Drug</DialogTitle>
          <DialogContent>
          <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="patient_name"
              value={this.state.patient_name}
              onChange={this.onChange}
              placeholder="Patient Name"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="drug_name"
              value={this.state.drug_name}
              onChange={this.onChange}
              placeholder="Drug Name"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="number"
              autoComplete="off"
              name="dosage"
              value={this.state.dosage}
              onChange={this.onChange}
              placeholder="Dosage"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="number"
              autoComplete="off"
              name="frequency"
              value={this.state.frequency}
              onChange={this.onChange}
              placeholder="Frequency"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="number"
              autoComplete="off"
              name="adherence"
              value={this.state.adherence}
              onChange={this.onChange}
              placeholder="Adherence"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="reason"
              value={this.state.reason}
              onChange={this.onChange}
              placeholder="Reason"
              required
            /><br />
            
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleDrugClose} color="primary">
              Cancel
            </Button>
            <Button
              disabled={this.state.drug_name === '' || this.state.dosage === '' || this.state.frequency === ''}
              onClick={(e) => this.addDrug()} color="primary" autoFocus>
              Add Drug
            </Button>
          </DialogActions>
        </Dialog>

        <br />

        <TableContainer>
          <TextField
            id="standard-basic"
            type="search"
            autoComplete="off"
            name="search"
            value={this.state.search}
            onChange={this.onChange}
            placeholder="Search by drug name"
            required
          />
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                
                <TableCell align="center">Drug Name</TableCell>
                <TableCell align="center">Dosage</TableCell>
                <TableCell align="center">Frequency</TableCell>
                <TableCell align="center">Adherence</TableCell>
                <TableCell align="center">Reason</TableCell>
                <TableCell align="center">Action</TableCell>
               
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
                  <TableCell align="center">
                    <Button
                      className="button_style"
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={(e) => this.handleDrugEditOpen(row)}
                    >
                      Edit
                  </Button>
                    <Button
                      className="button_style"
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={(e) => this.deleteDrug(row._id)}
                    >
                      Delete
                  </Button>
                  </TableCell>
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