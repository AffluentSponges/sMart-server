require('dotenv').config();
const Vision = require('@google-cloud/vision');
const vision = Vision();
const axios = require('axios')
const Tag = require('../models/tag')

module.exports.getImageTitleAndCategory = (req, res) => {
  var url = req.query.image_links
  axios({
    method: 'post',
    url: 'https://westus.api.cognitive.microsoft.com/vision/v1.0/describe',
    headers: {'Ocp-Apim-Subscription-Key': process.env.MS_VISION},
    data: {
      url: url,
    }
  })
  .then(function (response) {
    Tag.where({tag: response.data.description.tags[0]}).fetch()
    .then(tags => {
      if (tags) {
        var category = tags.serialize();
        var data = {
          tags: response.data.description.tags,
          captions: response.data.description.captions[0].text,
          category_id: category.category_id
        }
        res.json(data);
      } else {
        res.end();
      }
    })
  })
  .catch(function (error) {
    console.log(error);
  });

}