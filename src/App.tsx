import React, {useState} from "react";
import {CarDetails, SHIFT_TYPES} from './cars/car';

import "./App.css";
import { CarComponent } from "./cars/car.component";
import { SearchComponent } from "./search/search.component";

function App() {
  let [searchTerm, setSearchTerm] = useState('');
  let [car, setCar] = useState<CarDetails>({
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
        car={car}
        setCar={setCar}
      />
      <CarComponent 
        car={car}
      />
    </div>
  );
}

export default App;
