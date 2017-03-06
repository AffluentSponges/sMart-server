const React = require('react');
const Dropzone = require('react-dropzone');
const upload = require('superagent/lib/client');

import { Image } from 'semantic-ui-react'

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(files) {
    var _this = this;
    upload.post('/upload')
    .attach('theseNamesMustMatch', files[0])
    .end((err, res) => {
      if (err) console.log('this is err', err);
      _this.props.handleImageUrl(res.text);
      console.log(res.text);
    })
  }

  render(){
    return (
      <div>
        <Dropzone className='dropzone' onDrop={this.onDrop} multiple={false}>
          <h3>Choose an image or drag it here.</h3>
        </Dropzone>
      </div>
    );
  }
};

export default FileUpload;