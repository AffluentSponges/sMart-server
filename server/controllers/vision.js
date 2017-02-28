const Vision = require('@google-cloud/vision');
const vision = Vision();
const axios = require('axios')
const controller = {};

controller.getImageTitleAndCategory = (req, res) => {
  var url = req.query.image_links

  // vision.detectLogos(url)
  // .then((results) => {
  //   const logos = results[0];

  //   console.log('Logos:');
  //   logos.forEach((logo) => console.log(logo));
  // });
  axios({
    method: 'post',
    url: 'https://westus.api.cognitive.microsoft.com/vision/v1.0/describe',
    headers: {'Ocp-Apim-Subscription-Key': 'a442d65b904f4c2495679c9ad93e5a20'},
    data: {
      url: url,
    }
  })
  .then(function (response) {
    var data = {
      tags: response.data.description.tags,
      captions: response.data.description.captions[0].text
    }
    res.json(data);
  })
  .catch(function (error) {
    console.log(error);
  });
}

module.exports = controller;