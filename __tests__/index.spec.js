import React from 'react';
import {shallow, mount} from 'enzyme';
import Perimeter from '../src';

let component;
let mountedComponent;
let shallowComponent;
let onBreachFunction = jest.fn();

describe('Perimeter', () => {
  beforeEach(() => {
    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();

    component = (
      <Perimeter
        onBreach={onBreachFunction}
        padding={300}
      >
        <div className="perimeter-component">Perimeter</div>
      </Perimeter>
    );

    shallowComponent = shallow(component)
    mountedComponent = mount(component);
  });
  it('should return react component', () => {
    expect(shallowComponent.length).toBe(1);
  });
  it('should render children', () => {
    expect(shallowComponent.find(".perimeter-component").props().children).toBe("Perimeter");
  });
  it('should addEventListener on mount', () => {
    expect(addEventListener).toHaveBeenCalledTimes(2);
  });
  it('should removeEventListener on unmount', () => {
    mountedComponent.unmount();
    expect(removeEventListener).toHaveBeenCalledTimes(2);
  });
});
