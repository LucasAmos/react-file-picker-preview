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
      <div className="app" >
        <header className="App-header">
          <code>React-Simple-File-Picker</code>
          <div onClick={() => {
            this.setState({ reset: Object.assign({}) })
          }}>clear the picker</div>
          <FilePicker
            className="button"
            maxSize={2}
            buttonText="Upload a file!"
            extensions={["application/pdf"]}
            onChange={(file) => this.setState({ file })}
            onError={errMsg => { alert("that's an error: " + errMsg) }}
            onClear={() => this.setState({ file: {} })}
            triggerReset={this.state.reset}
          >
            <div className="input-button" type="button">
              Dee file picker
      </div>
          </FilePicker>

          <div className="file-details">
            <h3>The file</h3>
            <h4>Name: {file.name}</h4>
            <h4>Size: {file.size}{file.size ? ' bytes' : null}</h4>
            <h4>Type: {file.type}</h4>
            <h4>Modified: {file.lastModified}</h4>

          </div>

        </header>
      </div>
    );
  }
}

export default Demo
