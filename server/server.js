//installing dependencies
var express = require("express");
var app = express();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var multer = require('multer'),
  bodyParser = require('body-parser'),
  path = require('path');
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/medicinesDB");
var fs = require('fs');

//importing models
var drug = require("./models/drug.js");
var user = require("./models/user.js");

var dir = './uploads';

//function for uploading png or jpg files
var upload = multer({
  storage: multer.diskStorage({

    destination: function (req, file, callback) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      callback(null, './uploads');
    },
    filename: function (req, file, callback) { callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); }

  }),

  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      return callback(/*res.end('Only images are allowed')*/ null, false)
    }
    callback(null, true)
  }
});
app.use(cors());
app.use(express.static('uploads'));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));

app.use("/", (req, res, next) => {
  try {
    if (req.path == "/login" || req.path == "/register" || req.path == "/") {
      next();
    } else {
      /* decode jwt token if authorized*/
      jwt.verify(req.headers.token, 'shhhhh11111', function (err, decoded) {
        if (decoded && decoded.user) {
          req.user = decoded;
          next();
        } else {
          return res.status(401).json({
            errorMessage: 'Not a user yet!',
            status: false
          });
        }
      })
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
})

app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    title: 'Apis'
  });
});

/* API for the login page - checks & verifies whether someone is already registered */
app.post("/login", (req, res) => {
  try {
    if (req.body && req.body.username && req.body.password) {
      user.find({ username: req.body.username }, (err, data) => {
        if (data.length > 0) {

          if (bcrypt.compareSync(data[0].password, req.body.password)) {
            checkUserAndGenerateToken(data[0], req, res);
          } else {

            res.status(400).json({
              errorMessage: 'Incorrect username or password!',
              status: false
            });
          }

        } else {
          res.status(400).json({
            errorMessage: 'Incorrect username or password!',
            status: false
          });
        }
      })
    } else {
      res.status(400).json({
        errorMessage: 'Fill in all fields!',
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }

});

/* register api */
app.post("/register", (req, res) => {
  try {
    if (req.body && req.body.username && req.body.password) {

      user.find({ username: req.body.username }, (err, data) => {

        if (data.length == 0) {

          let User = new user({
            username: req.body.username,
            password: req.body.password
          });
          User.save((err, data) => {
            if (err) {
              res.status(400).json({
                errorMessage: err,
                status: false
              });
            } else {
              res.status(200).json({
                status: true,
                title: 'User Registered Successfully.'
              });
            }
          });

        } else {
          res.status(400).json({
            errorMessage: `This UserName ${req.body.username} Already Exist!`,
            status: false
          });
        }

      });

    } else {
      res.status(400).json({
        errorMessage: 'Fill in all fields!',
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
});

//verifying user
function checkUserAndGenerateToken(data, req, res) {
  jwt.sign({ user: data.username, id: data._id }, 'shhhhh11111', { expiresIn: '1d' }, (err, token) => {
    if (err) {
      res.status(400).json({
        status: false,
        errorMessage: err,
      });
    } else {
      res.json({
        message: 'Login Successfully.',
        token: token,
        status: true
      });
    }
  });
}

/* API for adding a new medicine */
app.post("/add-drug", upload.any(), (req, res) => {
  try {
    if (req.files && req.body && req.body.name && req.body.drug_name && req.body.dosage &&
      req.body.frequency) {

      let new_drug = new drug();
      new_drug.name = req.body.name;
      new_drug.drug_name = req.body.drug_name;
      new_drug.dosage = req.body.dosage;
      new_drug.image = req.files[0].filename;
      new_drug.frequency = req.body.frequency;
      new_drug.user_id = req.user.id;
      new_drug.save((err, data) => {
        if (err) {
          res.status(400).json({
            errorMessage: err,
            status: false
          });
        } else {
          res.status(200).json({
            status: true,
            title: 'Medicine added!'
          });
        }
      });

    } else {
      res.status(400).json({
        errorMessage: 'Fill in all details!',
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
});

/* API to edit a medicine added by the user */
app.post("/update-drug", upload.any(), (req, res) => {
  try {
    if (req.files && req.body && req.body.name && req.body.drug_name && req.body.dosage &&
      req.body.id && req.body.frequency) {

      drug.findById(req.body.id, (err, new_drug) => {

        // if file already exist than remove it
        if (req.files && req.files[0] && req.files[0].filename && new_drug.image) {
          var path = `./uploads/${new_drug.image}`;
          fs.unlinkSync(path);
        }

        if (req.files && req.files[0] && req.files[0].filename) {
          new_drug.image = req.files[0].filename;
        }
        if (req.body.name) {
          new_drug.name = req.body.name;
        }
        if (req.body.drug_name) {
          new_drug.drug_name = req.body.drug_name;
        }
        if (req.body.dosage) {
          new_drug.dosage = req.body.dosage;
        }
        if (req.body.frequency) {
          new_drug.frequency = req.body.frequency;
        }

        new_drug.save((err, data) => {
          if (err) {
            res.status(400).json({
              errorMessage: err,
              status: false
            });
          } else {
            res.status(200).json({
              status: true,
              title: 'Drug edited!'
            });
          }
        });

      });

    } else {
      res.status(400).json({
        errorMessage: 'Fill in all details!',
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
});

/* API for deleting a medicine */
app.post("/delete-drug", (req, res) => {
  try {
    if (req.body && req.body.id) {
      drug.findByIdAndUpdate(req.body.id, { is_delete: true }, { new: true }, (err, data) => {
        if (data.is_delete) {
          res.status(200).json({
            status: true,
            title: 'Medicine deleted!'
          });
        } else {
          res.status(400).json({
            errorMessage: err,
            status: false
          });
        }
      });
    } else {
      res.status(400).json({
        errorMessage: 'Fill in all details!',
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
});

/*API to search a medicine by its name*/
app.get("/get-drug", (req, res) => {
  try {
    var query = {};
    query["$and"] = [];
    query["$and"].push({
      is_delete: false,
      user_id: req.user.id
    });
    if (req.query && req.query.search) {
      query["$and"].push({
        name: { $regex: req.query.search }
      });
    }
    var perPage = 5;
    var page = req.query.page || 1;
    drug.find(query, { date: 1, name: 1, id: 1, drug_name: 1, dosage: 1, frequency: 1, image: 1 })
      .skip((perPage * page) - perPage).limit(perPage)
      .then((data) => {
        drug.find(query).count()
          .then((count) => {

            if (data && data.length > 0) {
              res.status(200).json({
                status: true,
                title: 'Medicine found!',
                drugs: data,
                current_page: page,
                total: count,
                pages: Math.ceil(count / perPage),
              });
            } else {
              res.status(400).json({
                errorMessage: 'No medicine found!',
                status: false
              });
            }

          });

      }).catch(err => {
        res.status(400).json({
          errorMessage: err.message || err,
          status: false
        });
      });
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }

});

app.listen(2000, () => {
  console.log("Server is Runing On port 2000");
});
