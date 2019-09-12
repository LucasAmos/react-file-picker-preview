import React, { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
import FileInput from '../FileInput';
import './Index.css';

export default function FilePicker(props) {
  const [fileName, setFileName] = useState(null);
  const isInitialMount = useRef(true);

  const {
    className, style, buttonText, onError, onChange, maxSize,
    extensions, onClear, triggerReset, children,
  } = props;

  function clearFile() {
    setFileName(null);
    if (onClear) {
      onClear(null);
    }
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      clearFile(
      );
    }
  }, [triggerReset]);

  function validate(file) {
    if (!file) {
      onError('Failed to upload a file.');
      return;
    }
    // convert maxSize from megabytes to bytes
    const maxBytes = maxSize * 1000000;

    if (file.size > maxBytes) {
      onError(`File size must be less than ${maxSize} MB.`);
      return;
    }
    // return native file object
    if (extensions) {
      const uploadedFileExt = file.type;
      const isValidFileExt = extensions
        .map(ext => ext.toLowerCase())
        .includes(uploadedFileExt);

      if (!isValidFileExt) {
        onError(`Must upload a file of type: ${extensions.join(' or ')}`);
        return;
      }
    }
    setFileName(file.name);
    onChange(file);
  }

  return (
    <div style={style} className={className || 'container'}>
      <FileInput onChange={validate}>
        {buttonText === undefined ? children
          : (
            <div className="input-button" type="button">
              {buttonText}
            </div>
          )
        }
      </FileInput>
      {fileName ? (
        <div className="row-filename">
          <div style={{ float: 'left' }} className="fileName">{fileName}</div>
          <div
            style={{ float: 'right', marginLeft: 5, paddingTop: 3 }}
            className="icon-container"
          >
            <FaTimes className="icon" onClick={clearFile} />
          </div>
        </div>
      ) : <div className="row-filename-empty"> &nbsp; </div>}
    </div>
  );
}

FilePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  maxSize: PropTypes.number,
  extensions: PropTypes.array,
  validateContent: PropTypes.func,
  style: PropTypes.object,
}

FilePicker.defaultProps = {
  maxSize: 2,
  //extensions: ['application/pdf'],
}
