// external imports
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';
// local imports
import FilePicker from '.';
// configure adapter

configure({ adapter: new Adapter() });

describe('File Picker', () => {
  let onChange;
  let onError;
  let onClear;

  beforeEach(() => {
    onChange = jest.fn();
    onError = jest.fn();
    onClear = jest.fn();
  });

  test('returns a valid component with required props', () => {
    const ele = (
      <FilePicker onChange={() => ({})} onError={() => ({})}>
        <button>Click to upload</button>
      </FilePicker>
    );

    expect(React.isValidElement(ele)).toBe(true);
  });

  test('call error handler when no file uploaded', () => {
    // mount the select with a few options
    const wrapper = mount(
      <FilePicker onChange={onChange} onError={onError}>
        <div>Click here</div>
      </FilePicker>
    );

    // trigger the onChange callback on file input
    wrapper.find('input').simulate('change', { target: { files: [] } })

    expect(onError.mock.calls.length).toBe(1);
    expect(onChange.mock.calls.length).toBe(0);
  });

  test('call error handler when a file with incorrect extension is uploaded', () => {
    // mount the select with a few options
    const wrapper = mount(
      <FilePicker
        onChange={onChange}
        onError={onError}
        extensions={['application/pdf']}>
        <div>Click here</div>
      </FilePicker>
    );

    const file = new Blob(['file contents'], { type: 'text/plain' });
    file.name = 'file.txt';

    // trigger the onChange callback on file input
    wrapper.find('input').simulate('change', { target: { files: [file] } });

    expect(onError.mock.calls.length).toBe(1);
    expect(onChange.mock.calls.length).toBe(0);
  });

  test('call error handler when a file that is too large is uploaded', () => {
    // mount the select with a few options
    const wrapper = mount(
      <FilePicker
        onChange={onChange}
        onError={onError}
        // set unreasonably small max size so that our tiny blob is too big
        maxSize={0.0000000001}
      >
        <div>Click here</div>
      </FilePicker>
    );

    const file = new Blob(['file contents'], { type: 'text/plain' })

    // trigger the onChange callback on file input
    wrapper.find('input').simulate('change', { target: { files: [file] } })

    expect(onError.mock.calls.length).toBe(1);
    expect(onChange.mock.calls.length).toBe(0);
  });

  test('call change handler when a file with correct size and extension is uploaded', () => {
    // mount the select with a few options
    const wrapper = mount(
      <FilePicker
        onChange={onChange}
        onError={onError}
        extensions={['text/plain']}
        maxSize={1}
      >
        <div>Click here</div>
      </FilePicker>
    );

    const file = new Blob(['file contents'], { type: 'text/plain' });
    file.name = 'file.txt';

    // trigger the onChange callback on file input
    wrapper.find('input').simulate('change', { target: { files: [file] } });

    expect(onError.mock.calls.length).toBe(0);
    expect(onChange.mock.calls.length).toBe(1);
  });

  test('call onClear handler when triggerReset is called', () => {
    let clear = { bob: 'bob' };
    // mount the select with a few options
    const wrapper = mount(
      <FilePicker
        onChange={onChange}
        onError={onError}
        maxSize={1}
        onClear={onClear}
        triggerReset={clear}
      >
        <div>Click here</div>
      </FilePicker>
    );

    const file = new Blob(['file contents'], { type: 'text/plain' });
    file.name = 'file.txt';
    clear = { batty: "batty" }

    // trigger the onChange callback on file input
    wrapper.find('input').simulate('change', { target: { files: [file] } });

    expect(onClear.mock.calls.length).toBe(1);
  });


  test('check button text matches buttonText prop', () => {
    let clear = { bob: 'bob' };
    // mount the select with a few options
    const wrapper = mount(
      <FilePicker
        buttonText="Upload a file!"
        onChange={onChange}
        onError={onError}
        maxSize={1}
      >
        <div>Click here</div>
      </FilePicker>
    );

    const file = new Blob(['file contents'], { type: 'text/plain' });
    file.name = 'file.txt';

    wrapper.find('input-button');
    expect(wrapper.find('div.input-button').text()).toBe('Upload a file!');
  });

  test('check button text matches wrapped div', () => {
    let clear = { bob: 'bob' };
    // mount the select with a few options
    const wrapper = mount(
      <FilePicker
        onChange={onChange}
        onError={onError}
        maxSize={1}
      >
        <div className="input-button">Click here</div>
      </FilePicker>
    );

    const file = new Blob(['file contents'], { type: 'text/plain' });
    file.name = 'file.txt';

    wrapper.find('input-button');
    expect(wrapper.find('div.input-button').text()).toBe('Click here');
  });
});
