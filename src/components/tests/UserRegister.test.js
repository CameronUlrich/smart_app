import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import UserRegister from '../UserRegister';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<BrowserRouter><UserRegister></UserRegister></BrowserRouter>, div)
})



test('render a small label', () => {
    const wrapper = shallow(
        <UserRegister></UserRegister>
    );
    expect(wrapper).toMatchSnapshot();
});
