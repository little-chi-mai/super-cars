import React, {useState} from "react";
import {CarDetails, SHIFT_TYPES} from './cars/car';

import "./App.css";
import { CarComponent } from "./cars/car.component";
import { SearchComponent } from "./search/search.component";

function App() {
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
