import React from 'react';
import {SearchComponent} from '../search.component';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {IProps as Props} from '../../cars/car.component';

let getByTestId;

describe("Search", () => {

  beforeEach(() => {
    const component = render(<SearchComponent/>);
    getByTestId = component.getByTestId;
  })
  
  test('input field renderes correctly', () => {
    const inputEl = getByTestId("search-input");
    expect(inputEl.textContent).toBe('');

    fireEvent.change(inputEl, {
      target: {
        value: 'm'
      }
    })
    
    
    expect(inputEl.textContent).toBe('m');
  })
  
  // test('')
})



