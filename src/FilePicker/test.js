/* eslint-disable react/button-has-type */
// external imports
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';
import FilePicker from '.';

configure({ adapter: new Adapter() });

describe('File Picker Component', () => {
  let onChange;
  let onError;
  let savedError;
  let savedWarn;
  let onClear;
  let element;

  beforeEach(() => {
    onChange = jest.fn();
    onError = jest.fn();
    onClear = jest.fn();
    savedError = console.error;
    console.error = jest.fn();
    savedWarn = console.warn;
    console.warn = jest.fn();

    element = (
      <FilePicker
        test="file-picker"
        className="button"
        maxSize={2}
        buttonText="Upload a file!"
        extensions={['application/pdf']}
        onChange={onChange}
        onError={onError}
        onClear={onClear}
      />
    );
  });

  afterEach(() => {
    console.error = savedError;
    console.warn = savedWarn;
  });

  test('Renders a valid component', () => {
    expect(React.isValidElement(element)).toBe(true);
  });

  test('call error handler when no file uploaded', () => {
    // mount the select with a few options
    const wrapper = mount(element);

    // trigger the onChange callback on file input
    wrapper.find('input').simulate('change', { target: { files: [] } });

    expect(onError.mock.calls.length).toBe(1);
    expect(onChange.mock.calls.length).toBe(0);
  });

  test('call error handler when a file with incorrect extension is uploaded', () => {
    // mount the select with a few options
    const wrapper = mount(element);

    const file = new Blob(['file contents'], { type: 'text/plain' });
    file.name = 'file.txt';

    // trigger the onChange callback on file input
    wrapper.find('input').simulate('change', { target: { files: [file] } });

    expect(onError.mock.calls.length).toBe(1);
    expect(onChange.mock.calls.length).toBe(0);
  });

  test('call error handler when a file that is too large is uploaded', () => {
    const wrapper = mount(<FilePicker
      test="file-picker"
      className="button"
      maxSize={0.0000000001}
      buttonText="Upload a file!"
      extensions={['application/pdf']}
      onChange={onChange}
      onError={onError}
      onClear={onClear}
    />);
    const file = new Blob(['file contents'], { type: 'application/pdf' });
    wrapper.find('input').simulate('change', { target: { files: [file] } });

    expect(onError.mock.calls.length).toBe(1);
    expect(onChange.mock.calls.length).toBe(0);
  });

  test('call change handler when a file with correct size and extension is uploaded', () => {
    const wrapper = mount(element);

    const file = new Blob(['file contents'], { type: 'application/pdf' });
    file.name = 'file.txt';

    // trigger the onChange callback on file input
    wrapper.find('input').simulate('change', { target: { files: [file] } });

    expect(onError.mock.calls.length).toBe(0);
    expect(onChange.mock.calls.length).toBe(1);
  });

  test('check button text matches buttonText prop', () => {
    const wrapper = mount(
      <FilePicker
        buttonText="Upload a file!"
        onChange={onChange}
        onError={onError}
        maxSize={1}
      >
        <div>Click here</div>
      </FilePicker>,
    );

    const file = new Blob(['file contents'], { type: 'text/plain' });
    file.name = 'file.txt';

    wrapper.find('input-button');
    expect(wrapper.find('div.input-button').text()).toBe('Upload a file!');
  });

  test('check button text matches prop', () => {
    const wrapper = mount(element);
    const file = new Blob(['file contents'], { type: 'application/pdf' });
    file.name = 'file.txt';
    wrapper.find('input-button');
    expect(wrapper.find('div.input-button').text()).toBe('Upload a file!');
  });

  test('check button text matches wrapped div', () => {
    const wrapper = mount(<FilePicker
      test="file-picker"
      className="button"
      maxSize={2}
      extensions={['application/pdf']}
      onChange={onChange}
      onError={onError}
      onClear={onClear}
    >
      <div className="input-button" type="button">
        Dee file picker
      </div>
    </FilePicker>);
    const file = new Blob(['file contents'], { type: 'application/pdf' });
    file.name = 'file.txt';
    wrapper.find('input-button');
    expect(wrapper.find('div.input-button').text()).toBe('Dee file picker');
  });

  it('File name is populated correctly', () => {
    const wrapper = mount(element);
    const file = new Blob(['file contents'], { type: 'application/pdf' });
    file.name = 'file.txt';
    wrapper.find('input').simulate('change', { target: { files: [file] } });
    expect(wrapper.find('.fileName').contains('file.txt')).toEqual(true);
  });

  it('File name is cleared correctly', () => {
    const wrapper = mount(element);
    const file = new Blob(['file contents'], { type: 'text/plain' });
    file.name = 'file.txt';
    wrapper.find('input').simulate('change', { target: { files: [file] } });

    expect(wrapper.find('.fileName').contains('file.txt')).toEqual(true);
    expect(onClear.mock.calls.length).toBe(0);
    wrapper.find('.icon').first().simulate('click').debug();
    expect(wrapper.find('.fileName').contains('file.txt')).toEqual(false);
    //console.log(wrapper.debug());
    expect(onClear.mock.calls.length).toBe(1);
  });
});
