# react-file-picker-simple

[![Build Status](https://travis-ci.org/meinstein/react-file-picker.svg?branch=master)](https://travis-ci.org/LucasAmos/react-file-picker-simple)
[![Coverage Status](https://coveralls.io/repos/github/LucasAmos/react-file-picker-simple/badge.svg?branch=master)](https://coveralls.io/github/LucasAmos/react-file-picker-simple?branch=master)
[![npm](https://img.shields.io/npm/v/react-file-picker-simple.svg)](https://www.npmjs.com/package/react-file-picker-simple)

Sensible file input wrappers. Demo included.

`npm i react-file-picker-simple`

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
