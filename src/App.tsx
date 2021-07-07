import React, {useState} from "react";

import {CarDetails, SHIFT_TYPES} from './cars/car';
import { CarComponent } from "./cars/car.component";
import { SearchComponent } from "./search/search.component";

import "./App.css";

function App() {
  // set initial state of searchTerm and carDetails as empty
  let [searchTerm, setSearchTerm] = useState<string>('');
  let [carDetails, setCarDetails] = useState<CarDetails>({
    make: '',
    model: '',
    price: 0,
    fuelType: '',
    shiftType: SHIFT_TYPES.automatic,
    features: [],
    colour: '',
  });
  return (
    <div className="app">
      <SearchComponent 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setCarDetails={setCarDetails}
      />
      <CarComponent 
        carDetails={carDetails}
      />
    </div>
  );
}

export default App;
