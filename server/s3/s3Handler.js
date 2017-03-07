const AWS = require('aws-sdk');

AWS.config.update(
  {
    accessKeyId: process.env.AWS_Access_Key_ID,
    secretAccessKey: process.env.AWS_Secret_Access_Key,
    "region": 'us-west-1',
  });

const s3 = new AWS.S3();

var getFilename = function(user) {
  var random = Math.floor(Math.random() * 10000000000000000);
  var filename = 'product_image' + '/' + random + '.jpg';
  return filename;
};

module.exports = function(req, res) {
  var filename = getFilename()
  s3.putObject({
      Bucket: 'affluentsponges',
      Key: filename, //https://s3-us-west-1.amazonaws.com/affluentsponges/my.great_photos-2014/jan/myvacation.jpg
      Body: req.file.buffer,
      ACL: 'public-read' // your permisions  
    }, (err) => { 
      if (err) {
        console.log('this is err from aws s3', err);
        return res.status(400).send(err);
      }
      res.send('https://s3-us-west-1.amazonaws.com/affluentsponges/' + filename);
  });
}