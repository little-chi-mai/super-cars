import React, { useState } from 'react';
import {findCars, getCarDetails} from '../cars/car.api';
import {IProps as Props} from '../cars/car.component';

interface IProps {
    searchTerm: string
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
    car: Props["car"]
    setCar: React.Dispatch<React.SetStateAction<Props["car"]>>
}

export const SearchComponent: React.FC<IProps> = ({searchTerm, setSearchTerm, car, setCar}) => {

    let [searchResult, setSearchResult] = useState([]);

    const onChange = function(e: React.ChangeEvent<HTMLInputElement>): void {
        setSearchTerm(e.target.value)
        findCars(e.target.value).then((response: any) => {
            if (!e.target.value) {
                setSearchResult([]);
            } else {
                setSearchResult(response);
            }
            // console.log(response);
        })
    }

    const onClick = function(car: any): void {
        console.log("CAR", car);
        
        let carDetails: any = getCarDetails(car.make, car.model);
        console.log('carDetails', carDetails);
        
        setCar(carDetails);
        setSearchTerm('');
        setSearchResult([]);
    }

    const showSearchResult = (): JSX.Element[] => {
      
        return searchResult.map((car: any) => {
            return (
                <div key={car.model} onClick={() => onClick(car)}>
                    <h3>{car.make} {car.model}</h3>
                    <h3>${car.price}</h3>
                </div>
            )
        })
    }



    return <div className="search">
        <input 
            className="search-input" 
            type="search" 
            placeholder="Search..."
            onChange={onChange}
            value={searchTerm}
        />
        {searchResult.length !== 0 && <div className="search-result">
            {showSearchResult()}
        </div>
        }
        
    </div>
}