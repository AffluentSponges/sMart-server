const React = require('react');
const Dropzone = require('react-dropzone');
const upload = require('superagent/lib/client');

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
            <Dropzone onDrop={this.onDrop} multiple={false}>
              <div>Try dropping a file here, or click to select a file to upload.</div>
            </Dropzone>
          </div>
      );
    }
};

export default FileUpload;