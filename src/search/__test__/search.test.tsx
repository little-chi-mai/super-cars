import React from 'react';
import {SearchComponent} from '../search.component';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

let getByTestId;

describe("Search", () => {

  beforeEach(() => {
    const component = render(<SearchComponent/>);
    getByTestId = component.getByTestId;
  })
  
  test('input field renderes correctly', () => {
    const inputEl = getByTestId("search-input");

    expect(inputEl.value).toBe('');
    console.log(inputEl);
    

    fireEvent.change(inputEl, {
      target: {
        value: 'm'
      }
    })
    console.log(inputEl);
    
    expect(inputEl.value).toBe('m');
  })
  
})



