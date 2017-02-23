const AWS = require('aws-sdk');

AWS.config.update(
  {
    accessKeyId: 'AKIAJW47QMR7Y6XH6UEQ',
    secretAccessKey: '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',
    "region": 'us-west-1',
  });

const s3 = new AWS.S3();

var getFilename = function(user) {
  var random = Math.floor(Math.random() * 10000000000000000);
  var filename = 'product_image' + '/' + random + '.jpg';
  return filename;
};

module.exports = function(req, res) {
  console.log(req.file.buffer);
  // req.file is the 'theseNamesMustMatch' file
  var filename = getFilename()
  s3.putObject({
      Bucket: 'affluentsponges',
      Key: filename, //https://s3-us-west-1.amazonaws.com/affluentsponges/my.great_photos-2014/jan/myvacation.jpg
      Body: req.file.buffer,
      ACL: 'public-read', // your permisions  
    }, (err) => { 
      console.log(err);
      if (err) return res.status(400).send(err);
      res.send('https://s3-us-west-1.amazonaws.com/affluentsponges/' + filename);
      //res.end(); //is this necessary?
  });
}