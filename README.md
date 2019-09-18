# react-file-picker-preview

[![Build Status](https://api.travis-ci.org/lucasamos/react-file-picker-preview.svg?branch=master)](https://travis-ci.org/LucasAmos/react-file-picker-preview)
[![Coverage Status](https://coveralls.io/repos/github/LucasAmos/react-file-picker-preview/badge.svg?branch=master)](https://coveralls.io/github/LucasAmos/react-file-picker-preview?branch=master)
[![npm](https://img.shields.io/npm/v/react-file-picker-preview)](https://www.npmjs.com/package/react-file-picker-preview)

Simple react file picker with built in preview bar. Easily styled and with default or custom file chooser button. Example included. Demo can be viewed at https://react-file-picker-preview-demo.herokuapp.com/

`npm i react-file-picker-preview`


### Features
 - File name preview
 - Customisable file size limit
 - Restrict file upload by extension[s]
 - OnChange, onError and onClear callbacks
 - Programmatically clear the selected file
 - Default button or custom element 
 - Custom className prop



## Example
```js
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
        <div>
          <div onClick={() => {
            this.setState({ reset: Object.assign({}) })
          }}>Clear the picker</div>
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
              The file picker
            </div>
          </FilePicker>
          <div className="file-details">
            <h3>The file</h3>
            <h4>Name: {file.name}</h4>
            <h4>Size: {file.size}{file.size ? ' bytes' : null}</h4>
            <h4>Type: {file.type}</h4>
            <h4>Modified: {file.lastModified}</h4>
          </div>
      </div>
    );
  }
}

export default Demo


```

## Example

```
npm run example
```
