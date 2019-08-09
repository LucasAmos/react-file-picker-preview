import React from 'react';

import { FilePicker } from '../lib';

class Demo extends React.Component {
  state = {
    file: {},
    reset: {},
  }


  render() {
    const { file } = this.state;

    return (
      <div className="app">
        <header className="App-header">
          <code>React-Simple-File-Picker</code>
          <div className="clear" onClick={() => {
            this.setState({ reset: Object.assign({}) })
          }}>Click here to clear the picker</div>
          <FilePicker
            className="button"
            maxSize={2}
            buttonText="Upload a file!"
            extensions={["application/pdf"]}
            onChange={(file) => this.setState({ file })}
            onError={error => { alert("that's an error: " + error) }}
            onClear={() => this.setState({ file: {} })}
            triggerReset={this.state.reset}
          >
            <div className="input-button" type="button">
              Dee file picker
            </div>
          </FilePicker>

          <div className="file-details">
            <h3>File details:</h3>
            <h4>Name: <span>{file.name} </span></h4>
            <h4>Size: <span>{file.size}{file.size ? ' bytes' : null}</span></h4>
            <h4>Type: <span>{file.type}</span></h4>
            <h4>Modified: <span>{file.lastModified}</span></h4>

          </div>

        </header>
      </div>
    );
  }
}

export default Demo
