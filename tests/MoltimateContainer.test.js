// jest.mock('../src/MoltimateContainer');
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import SearchContainer from '../src/search/SearchContainer';

configure({ adapter: new Adapter() });

// test('clear', () => {
//     const component = shallow(<MoltimateContainer/>);
//     component.clearEClass();
// })

describe("App", () => {
    it("renders correctly", () => {
        const component = shallow(<SearchContainer/>);
        // jest.spyOn(component, "clearEClass");
        console.log(component.props());
    });
});