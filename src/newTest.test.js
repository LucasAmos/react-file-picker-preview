import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';
import { FilePicker } from './index';

configure({ adapter: new Adapter() });

describe('FilePicker component', () => {
  let savedError;
  let savedWarn;
  let onClear;
  let demo;

  beforeEach(() => {
    savedError = console.error;
    console.error = jest.fn();
    savedWarn = console.warn;
    console.warn = jest.fn();
    onClear = jest.fn();

    demo = (
      <FilePicker
        test="file-picker"
        className="button"
        maxSize={2}
        buttonText="Upload a file!"
        extensions={['application/pdf']}
        onChange={file => console.log('changed')}
        onError={(errMsg) => { alert(`that's an error: ${errMsg}`); }}
        onClear={onClear}
      >
        <div className="input-button" type="button">
          Dee file picker
        </div>
      </FilePicker>
    );
  });

  afterEach(() => {
    console.error = savedError;
    console.warn = savedWarn;
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      shallow(
        demo,
      ),
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('File name is populated correctly', () => {
    const wrapper = mount(demo);
    const file = new Blob(['file contents'], { type: 'text/plain' });
    file.name = 'file.txt';
    wrapper.find('input').simulate('change', { target: { files: [file] } });
    expect(wrapper.find('.fileName').contains("file.txt")).toEqual(true);
  });

  it('File name is cleared correctly', () => {
    const wrapper = mount(demo);
    const file = new Blob(['file contents'], { type: 'text/plain' });
    file.name = 'file.txt';
    wrapper.find('input').simulate('change', { target: { files: [file] } });

    expect(wrapper.find('.fileName').contains("file.txt")).toEqual(true);
    wrapper.find('.icon').first().simulate('click').debug();
    expect(wrapper.find('.fileName').contains("file.txt")).toEqual(false);
    //console.log(wrapper.debug());
    expect(onClear.mock.calls.length).toBe(1);
  });
});
