import React from 'react';
import PropTypes from 'prop-types';

class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleFileUpload(evt) {
    const { onChange } = this.props;
    const file = evt.target.files[0];
    onChange(file);
    this.fileInput.value = null;
  }

  render() {
    const { style, children } = this.props;
    return (
      <div style={style}>
        <input
          type="file"
          style={{ display: 'none' }}
          onChange={this.handleFileUpload}
          ref={element => (this.fileInput = element)}
        />
        {React.cloneElement(children, {
          onClick: () => this.fileInput.click(),
        })}
      </div>
    );
  }
}

FileInput.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FileInput;
