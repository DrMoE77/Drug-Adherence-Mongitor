// importing all the necessary packages: React, axios
import React, { Component } from 'react';
import {
  Button, TextField, Dialog, DialogActions, LinearProgress,
  DialogTitle, DialogContent, TableBody, Table,
  TableContainer, TableHead, TableRow, TableCell
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import swal from 'sweetalert';
const axios = require('axios');

// dashboard class which shows a list of medicines uploaded by the patients
export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      openDrugtModal: false,
      openDrugEditModal: false,
      id: '',
      name: '',
      drug_name: '',
      dosage: '',
      frequency: '',
      file: '',
      fileName: '',
      page: 1,
      search: '',
      drugs: [],
      pages: 0,
      loading: false
    };
  }

  //getting the token from local storage
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

  //getting medicines from the database when the user searches for them
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
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
      this.setState({ loading: false, drugs: [], pages: 0 },()=>{});
    });
  }

  //deleting a medicine added by the patient(user)
  deleteDrug = (id) => {
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

  //to change the page incase there are multiple pages of medicines
  pageChange = (e, page) => {
    this.setState({ page: page }, () => {
      this.getDrug();
    });
  }

  //logging out of the dashboard to go back to the login page
  logOut = () => {
    localStorage.setItem('token', null);
    //routing back to the login page
    this.props.history.push('/');
  }

  //searching by patient's name
  onChange = (e) => {
    if (e.target.files && e.target.files[0] && e.target.files[0].name) {
      this.setState({ fileName: e.target.files[0].name }, () => { });
    }
    this.setState({ [e.target.name]: e.target.value }, () => { });
    if (e.target.name == 'search') {
      this.setState({ page: 1 }, () => {
        this.getDrug();
      });
    }
  };

  addDrug = () => {
    const fileInput = document.querySelector("#fileInput");
    const file = new FormData();
    file.append('file', fileInput.files[0]);
    file.append('name', this.state.name);
    file.append('drug_name', this.state.drug_name);
    file.append('frequency', this.state.frequency);
    file.append('dosage', this.state.dosage);

    axios.post('http://localhost:2000/add-drug', file, {
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
      this.setState({ name: '', drug_name: '', frequency: '', dosage: '', file: null, page: 1 }, () => {
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
    const fileInput = document.querySelector("#fileInput");
    const file = new FormData();
    file.append('id', this.state.id);
    file.append('file', fileInput.files[0]);
    file.append('name', this.state.name);
    file.append('drug_name', this.state.drug_name);
    file.append('frequency', this.state.frequency);
    file.append('dosage', this.state.dosage);

    //updating or editing the medicine uploaded by the user
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
      this.setState({ name: '', drug_name: '', frequency: '', dosage: '', file: null }, () => {
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

  //dialog box for details about the medicine 
  handleDrugOpen = () => {
    this.setState({
      openDrugModal: true,
      id: '',
      name: '',
      drug_name: '',
      dosage: '',
      frequency: '',
      fileName: ''
    });
  };

  handleDrugClose = () => {
    this.setState({ openDrugModal: false });
  };

  handleDrugEditOpen = (data) => {
    this.setState({
      openDrugEditModal: true,
      id: data._id,
      name: data.name,
      drug_name: data.drug_name,
      dosage: data.dosage,
      frequency: data.frequency,
      fileName: data.image
    });
  };

  handleDrugEditClose = () => {
    this.setState({ openDrugEditModal: false });
  };

  //rendering the html for the patient's dashboard which includes a table with medicines 
  render() {
    return (
      <div className="mainDiv">
        {this.state.loading && <LinearProgress size={40} />}
        <div>
          <h2>Patient's Dashboard</h2>
          
          {/* adding a new medicine to the table */}
          
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            onClick={this.handleDrugOpen}
          >  
            Add a Medicine
          </Button>
          
          {/* logout button*/}
          <Button
            className="button_style"
            variant="contained"
            size="small"
            onClick={this.logOut}
          >
            Log Out
          </Button>
        </div>

        {/* Edit a medicine from the table */}
        <Dialog
          open={this.state.openDrugEditModal}
          onClose={this.handleDrugClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Edit Medicine</DialogTitle>
          <DialogContent>
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="name"
              value={this.state.name}
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
              placeholder="Medicine Name"
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
            /><br /><br />
            <Button
              variant="contained"
              component="label"
            > Upload Prescription
            <input
                id="standard-basic"
                type="file"
                accept="image/*"
                name="file"
                value={this.state.file}
                onChange={this.onChange}
                id="fileInput"
                placeholder="File"
                hidden
              />
            </Button>&nbsp;
            {this.state.fileName}
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleDrugEditClose} color="primary">
              Cancel
            </Button>
            <Button
              disabled={this.state.name == '' || this.state.drug_name == '' || this.state.frequency == '' || this.state.dosage == ''}
              onClick={(e) => this.updateDrug()} color="primary" autoFocus>
              Edit Medicine
            </Button>
          </DialogActions>
        </Dialog>

        {/* Adding a new medicine */}
        <Dialog
          open={this.state.openDrugModal}
          onClose={this.handleDrugClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Add Medicine</DialogTitle>
          <DialogContent>
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="name"
              value={this.state.name}
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
              placeholder="Medicine Name"
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
            /><br /><br />
            <Button
              variant="contained"
              component="label"
            > Upload Prescription
            <input
                id="standard-basic"
                type="file"
                accept="image/*"
                // inputProps={{
                //   accept: "image/*"
                // }}
                name="file"
                value={this.state.file}
                onChange={this.onChange}
                id="fileInput"
                placeholder="File"
                hidden
                required
              />
            </Button>&nbsp;
            {this.state.fileName}
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleDrugClose} color="primary">
              Cancel
            </Button>
            <Button
              disabled={this.state.name == '' || this.state.drug_name == '' || this.state.frequency == '' || this.state.dosage == '' || this.state.file == null}
              onClick={(e) => this.addDrug()} color="primary" autoFocus>
              Add Medicine
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
            placeholder="Search by medicine name"
            required
          />
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Patient Name</TableCell>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Drug Name</TableCell>
                <TableCell align="center">Dosage</TableCell>
                <TableCell align="center">Frequency</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.drugs.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="center" component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center"><img src={`http://localhost:2000/${row.image}`} width="70" height="70" /></TableCell>
                  <TableCell align="center">{row.drug_name}</TableCell>
                  <TableCell align="center">{row.dosage}</TableCell>
                  <TableCell align="center">{row.frequency}</TableCell>
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
                  {/*adherence to be calculated based on sms confirmation received from the patient*/}
                  <TableCell align="center">Adherence</TableCell>
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