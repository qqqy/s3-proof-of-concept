// THIS TIME, WE'RE GOING TO TRY WITH A DIFFERENT TUTORIAL. IT ALWAYS LOOKS SO EASY, DOESN'T IT? //

require('dotenv').config()
const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')
const formData = require('express-form-data')
const fs = require('fs')
const fileType = require('file-type')
const bluebird = require('bluebird')
const multiparty = require('multiparty')
const { SERVER_PORT , SECRET_ACCESS_KEY , ACCESS_KEY_ID , BUCKET_NAME } = process.env

const app = express()
app.use(express.json())
// CONFIGURING THE KEYS FOR ACCESSING AWS //

aws.config.update({
  accessKeyId: ACCESS_KEY_ID ,
  secretAccessKey: SECRET_ACCESS_KEY ,
})

// CONFIGURING AWS TO WORK WITH PROMISES //

aws.config.setPromisesDependency(bluebird);

// CREATING S3 INSTANCE //

const s3 = new aws.S3();

// ABSTRACTING FUNCTION TO UPLOAD A FILE RETURNING A PROMISE //

const uploadFile = (buffer , name , type ) => {
  const params = {
    ACL: 'public-read' ,
    Body: buffer ,
    Bucket: BUCKET_NAME ,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  }
  return s3.upload(params).promise();
}

// DEFINING POST ROUTE //

app.post('/test-upload' , (req , res) => {
  const form = new multiparty.Form();
  form.parse(req, async (error, fields , files) => {
    if (error) throw new Error(error);
    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = fileType(buffer);
      const timestamp = Date.now().toString();
      const fileName = `bucketFolder/${timestamp}-lg`;
      const data = await uploadFile(buffer , fileName , type);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send(error)
    }
  })
})



app.listen(SERVER_PORT, () => console.log(SERVER_PORT + ' is our port in the storm.'))
