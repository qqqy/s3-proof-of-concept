require('dotenv').config()
// const image = require('./pink-sewing-machine.jpg')
const express = require('express')
const app = express()
// const S3FileUpload = require('react-s3')
const { SERVER_PORT , SECRET_ACCESS_KEY , ACCESS_KEY_ID , BUCKET_NAME } = process.env
// const config = {
//   bucketName: BUCKET_NAME,
//   region: 'us-east-1' ,
//   accessKeyId: ACCESS_KEY_ID ,
//   secretAccessKey: SECRET_ACCESS_KEY ,
// }

app.use(express.json())

// app.post('/testupload' , (req, res) => {
//   S3FileUpload.uploadFile(image , config)
//   .then(data => console.log(data))
//   .catch(err => console.error(err))
// })

app.listen(SERVER_PORT , () => console.log(SERVER_PORT + ' is our port in the storm.') )