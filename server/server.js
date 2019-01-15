require('dotenv').config()
const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')
const { SERVER_PORT , SECRET_ACCESS_KEY , ACCESS_KEY_ID } = process.env

const app = express()
app.use(express.json())

// HERE WE ADD OUR CREDENTIALS AND REGION TO OUR INSTANCE OF AWS-SDK //
aws.config.update({
  secretAccessKey: SECRET_ACCESS_KEY ,
  accessKeyId: ACCESS_KEY_ID ,
  region: 'us-east-2'
})

// HAVING DONE THAT, WE CREATE A NEW INSTANCE OF AWS.S3 //
const s3 = new aws.S3()

// NOW WE CREATE A NEW INSTANCE OF MULTER-RETURN, IN WHICH WE PASS IN ONE VALUE //
const upload = multer({
  storage: multerS3({
    // WE PASS IN OUR NEW INSTANCE OF AWS.S3, AND CREATE TWO METHODS THAT CAN BE READ BY MULTERS3 //
    s3: s3,
    bucket: 'black-flag-project' ,
    acl: 'public-read' ,
    metadata: function (req, file, cb) {
      cb(null, {fieldname: file.fieldname});
    },
    key: function(req, file, cb) {
      cb(null, {fieldname: file.fieldname});
    }
  })
})

module.exports = upload;

const singleUpload = upload.single('image')

app.post('/image-upload', function(req , res){
  singleUpload(req, res, function(err , some){
    if(err) {return res.status(422).send({errors: [{title: 'Image Upload Error' , detail: err.stack}]})
  }

  return res.json({'imageURL': req.file.location})
  })
})


app.listen(SERVER_PORT, () => console.log(SERVER_PORT + ' is our port in the storm.'))
